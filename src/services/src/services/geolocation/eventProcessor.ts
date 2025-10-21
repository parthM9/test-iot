import TelemetryClient from "applicationinsights/out/Library/TelemetryClient";
import { DequeuedMessageItem } from "@azure/storage-queue";
import { OEMDeviceHeartbeatType } from "../../common/types/oem/types";
import { OEMDeviceHeartbeat } from "../../common/types/oem/OEMDeviceHeartbeat";
import { GoogleGeoLocation } from "../../common/geolocate/GoogleGeoLocation";
import { GoogleGeoLocationRequest, GoogleGeoLocationResponse } from "../../common/geolocate/types";
import { Record } from "../../common/types/oem/Record";
import { createOurMessageForLocation } from "../../common/messages/messageUtils";
import { QueueMessageProvider } from "../../common/queues/QueueMessageProvider";
import { ILocationRepository } from "../../common/repositories/location/ILocationRepository";
import { IDeviceLocation, LocationSource, MissingLocationData, SuccessfulLocationData } from "../../common/repositories/location/types";
import { IAlerter } from "../../common/alerter/Alerter";
import { getLastLocationForDevice } from "../location/eventProcessor";

export async function processMessage(
  message: DequeuedMessageItem,
  geolocator: GoogleGeoLocation,
  locationRepository: ILocationRepository,
  deadLetterQueue: QueueMessageProvider,
  alerter: IAlerter,
  logger: TelemetryClient,
) {
  try {
    logger.trackEvent({
      name: "ReceivedMessageToGeoLocate",
      properties: {
        messageId: message.messageId,
        dequeueCount: message.dequeueCount,
      },
    });

    if (message.dequeueCount > 10) {
      await handleDeadletter(message, deadLetterQueue, logger);
      return;
    }

    const iotHubMessage = JSON.parse(message.messageText);

    // At this point only OEM messages need geolocation
    const deviceId = iotHubMessage.systemProperties["iothub-connection-device-id"];
    const json = iotHubMessage.body as OEMDeviceHeartbeatType;
    const heartbeat = new OEMDeviceHeartbeat(json, deviceId);

    console.log(`Received message to geo-locate: deviceId=${deviceId}, time=${heartbeat.records[0]?.dateUTC}`);

    const geoLookupPromised: Promise<IDeviceLocation | undefined>[] = heartbeatToGeoLocationPromise(
      heartbeat,
      deviceId,
      geolocator,
      logger,
    );

    const locations = (await Promise.all(geoLookupPromised)).filter((loc) => loc !== undefined);

    const writes = [];
    const alerts = [];

    for (const location of locations) {
      writes.push(locationRepository.writeLocation(location));
    }

    const externalDeviceIds = new Set(locations.map((event) => event.externalDeviceId));
    externalDeviceIds.forEach((externalDeviceId) => {
      const lastLocation = getLastLocationForDevice(externalDeviceId, locations);
      alerts.push(alerter.alertForDeviceIfNeeded(externalDeviceId, lastLocation, 15000));
    });

    await Promise.all(writes);

    for (const location of locations) {
      logger.trackEvent({
        name: "PersistedLocation",
        properties: {
          iotHubDevice: location.deviceId,
          deviceId: location.externalDeviceId,
        },
      });
    }

    try {
      await Promise.all(alerts);
    } catch (alertErr) {
      console.log(`Failed to alert locations`, location, alertErr);
      logger.trackException({
        exception: alertErr,
        properties: {
          type: "FailedToAlertLocation",
          location: location,
        },
      });
    }
  } catch (err) {
    console.log("Error processing geo-location message", err);
    logger.trackException({
      exception: err,
      properties: {
        type: "FailedToProcessMessage",
        event: message.messageText,
      },
    });
    throw err;
  }
}

function heartbeatToGeoLocationPromise(
  heartbeat: OEMDeviceHeartbeat,
  deviceId: string,
  geolocator: GoogleGeoLocation,
  logger: TelemetryClient,
): Promise<IDeviceLocation | undefined>[] {
  return heartbeat.records.map((record) => {
    const accessPoints = record.fields.filter((f) => f.isAccessPoints).flatMap((field) => field.accessPoints.accessPoints);
    const cellTowers = record.fields.filter((f) => f.isTowers).flatMap((field) => field.towersField.towers);

    const request: GoogleGeoLocationRequest = {
      homeMobileCountryCode: 505,
      homeMobileNetworkCode: 1,
      radioType: "lte",
      considerIp: false,
      wifiAccessPoints: accessPoints.map((ap) => ap.toGoogleFormat()),
      cellTowers: cellTowers.map((ct) => ct.toGoogleFormat()),
    };

    const source: LocationSource = accessPoints && cellTowers ? "wifi,cell" : accessPoints ? "wifi" : "cell";
    return geoLocate(deviceId, geolocator, heartbeat, record, request, source, logger);
  });
}

async function geoLocate(
  deviceId: string,
  geolocator: GoogleGeoLocation,
  heartbeat: OEMDeviceHeartbeat,
  record: Record,
  request: GoogleGeoLocationRequest,
  locationSource: LocationSource,
  logger: TelemetryClient,
): Promise<IDeviceLocation> {
  try {
    const response = await geolocator.geolocate(request);
    const locationData = response.location
      ? getSuccessfulLocationData(response, record.dateUTC, locationSource)
      : getErrorLocationData(response, record.dateUTC, locationSource);

    const msg = createOurMessageForLocation(heartbeat, locationData, deviceId, record);

    if (response.location) {
      console.log(`Successfully geo-located: id=${msg.id}, deviceId=${msg.deviceId}, time=${msg.timeUTC}`, JSON.stringify(response));
    } else if (response.error?.code === 404) {
      console.log(`No location available: id=${msg.id}, deviceId=${msg.deviceId}, time=${msg.timeUTC}`);
    } else {
      console.log(
        `Error geo-locating device message: id=${msg.id}, deviceId=${msg.deviceId}, time=${msg.timeUTC}, response=${JSON.stringify(
          response,
        )}`,
      );
    }

    return msg;
  } catch (err) {
    console.log("Error geo-locating message", err, JSON.stringify(request));
    logger.trackException({
      exception: err,
      properties: {
        type: "FailedToGeoLocateMessage",
      },
    });
  }
  return undefined;
}

function getSuccessfulLocationData(
  response: GoogleGeoLocationResponse,
  dateUTC: string,
  locationSource: LocationSource,
): SuccessfulLocationData {
  return {
    lat: response.location.lat,
    long: response.location.lng,
    positionAccuracy: response.accuracy, // meters
    source: locationSource,
    timeUTC: dateUTC,
  };
}

function getErrorLocationData(response: GoogleGeoLocationResponse, dateUTC: string, locationSource: LocationSource): MissingLocationData {
  const errors = response.error?.errors.map((err) => err.reason) || [];
  if (errors.length > 0) {
    return {
      error: errors[0],
    };
  }
  return { error: response.error.message };
}

async function handleDeadletter(message: DequeuedMessageItem, deadLetterQueue: QueueMessageProvider, logger: TelemetryClient) {
  logger.trackException({
    exception: new Error("Processing attempts exceeded for messages"),
    properties: {
      type: "ProcessingAttemptsExceeded",
      event: message.messageText,
    },
  });
  try {
    await deadLetterQueue.putMessage(message.messageText);
  } catch (err) {
    console.log("Failed to add to deadletter queue", err);
    logger.trackException({
      exception: err,
      properties: {
        type: "FailedToAddMessageToDeadletterQueue",
        event: message.messageText,
      },
    });
  }
}
