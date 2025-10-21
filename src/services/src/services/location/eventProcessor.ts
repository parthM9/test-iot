import { MessagingError, PartitionContext, ReceivedEventData } from "@azure/event-hubs";
import TelemetryClient from "applicationinsights/out/Library/TelemetryClient";
import { ILocationRepository } from "../../common/repositories/location/ILocationRepository";
import { IDeviceLocation } from "../../common/repositories/location/types";
import { IAlerter } from "../../common/alerter/Alerter";
import { IOTHubDeviceMessage } from "../../common/types/IOTHubDeviceMessage";

export async function processLocationEvents(
  events: ReceivedEventData[],
  context: PartitionContext,
  locationRepository: ILocationRepository,
  alerter: IAlerter,
  logger: TelemetryClient,
) {
  try {
    if (events.length === 0) {
      return;
    }

    const deviceIds = events.map((e) => e.systemProperties["iothub-connection-device-id"]).filter((deviceId) => deviceId !== undefined);

    logger.trackEvent({
      name: "ReceivedRawEvents",
      measurements: { eventCount: events.length },
      properties: {
        devices: deviceIds,
      },
    });

    console.log(
      `Received ${events.length} to process for devices: ${deviceIds.join(",")} for consumer group ${context.consumerGroup} and partition ${
        context.partitionId
      }`,
    );

    const writes = [];
    const alerts = [];

    let parsedEvents: IDeviceLocation[] = [];

    for (const event of events) {
      const heartbeat = new IOTHubDeviceMessage(event);
      parsedEvents = parsedEvents.concat(heartbeat.payload.getLocations());
    }

    try {
      for (const location of parsedEvents) {
        writes.push(locationRepository.writeLocation(location));
      }

      const externalDeviceIds = new Set(parsedEvents.map((event) => event.externalDeviceId));
      externalDeviceIds.forEach((externalDeviceId) => {
        const lastLocation = getLastLocationForDevice(externalDeviceId, parsedEvents);
        alerts.push(alerter.alertForDeviceIfNeeded(externalDeviceId, lastLocation, 15000));
      });
    } catch (err) {
      console.log("Failed to process event", JSON.stringify(event));
      logger.trackException({
        exception: err,
        properties: {
          type: "FailedToProcessLocationEvent",
          event: JSON.stringify(event),
        },
      });
      throw err;
    }

    await Promise.all(writes);

    for (const location of parsedEvents) {
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

    await context.updateCheckpoint(events[events.length - 1]);
  } catch (err) {
    console.log("Error in processEvents", err);
    logger.trackException({
      exception: err,
      properties: {
        type: "FailedToProcessEvents",
      },
    });
  }
}

export function getLastLocationForDevice(externalDeviceId: string, deviceLocations: IDeviceLocation[]) {
  return deviceLocations
    .filter((event) => event.externalDeviceId === externalDeviceId)
    .sort((a: IDeviceLocation, b: IDeviceLocation) => {
      return new Date(b.timeUTC).getTime() - new Date(a.timeUTC).getTime();
    })[0];
}

export async function processLocationError(error: Error | MessagingError, context: PartitionContext, logger: TelemetryClient) {
  console.log("Error processing events", error);
  logger.trackException({
    exception: error,
    properties: {
      type: "FailedToProcessEvents",
    },
  });
}
