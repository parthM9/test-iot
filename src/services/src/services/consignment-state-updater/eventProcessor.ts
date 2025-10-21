import TelemetryClient from "applicationinsights/out/Library/TelemetryClient";
import { DequeuedMessageItem } from "@azure/storage-queue";
import { QueueMessageProvider } from "../../common/queues/QueueMessageProvider";
import { ICarioClient } from "../../common/cario/CarioClient";
import {
  CarioCallback,
  ConsignmentStatusEvent,
  parseStatusEvent,
  PersistedConsignment,
  TRACKER_ASSET_CLASS,
} from "../../common/repositories/consignment/consignment";
import { IGeocodeClient } from "../../common/geocode/GoogleGeocodeClient";
import { IConsignment } from "../../common/cario/generated/carioTypes";
import { convertDeliveryAddressToGeocode } from "./utils";
import { IConsignmentRepository } from "../../common/repositories/consignment/ConsignmentRepository";

export async function processMessage(
  message: DequeuedMessageItem,
  consignmentRepository: IConsignmentRepository,
  deadLetterQueue: QueueMessageProvider,
  carioClient: ICarioClient,
  geoCodeClient: IGeocodeClient,
  logger: TelemetryClient,
) {
  try {
    logger.trackEvent({
      name: "ReceivedMessageForConsignment",
      properties: {
        messageId: message.messageId,
        messageText: message.messageText,
        dequeueCount: message.dequeueCount,
      },
    });

    if (message.dequeueCount > 10) {
      await handleDeadletter(message, deadLetterQueue, logger, "ProcessingAttemptsExceeded");
      return;
    }

    const payload = parsePayload(message.messageText);
    if (!payload) {
      await handleDeadletter(message, deadLetterQueue, logger, "PayloadInvalid");
      return;
    }

    const carioConsignment = await carioClient.GetConsignmentByUID(payload.Id);
    if (!carioConsignment) {
      await handleDeadletter(message, deadLetterQueue, logger, "NoSuchConsignment");
      return;
    }

    let existingConsignment = (await consignmentRepository.get(payload.Id)) as PersistedConsignment | undefined;
    if (!existingConsignment) {
      existingConsignment = PersistedConsignment.fromCallBack(payload, carioConsignment);
    }

    existingConsignment.callbackHistory.push(payload);
    existingConsignment.lastConsignment = carioConsignment;
    existingConsignment.consignmentHistory.push(carioConsignment);

    if (!existingConsignment.deliveryCoordinates) {
      const formattedAddress = convertDeliveryAddressToGeocode(carioConsignment.deliveryAddress);
      const result = await geoCodeClient.geocode(formattedAddress);
      if (result && result.status === "OK" && result.results[0] && result.results[0].geometry?.location) {
        existingConsignment.deliveryCoordinates = {
          lat: result.results[0].geometry.location.lat,
          long: result.results[0].geometry.location.lng,
        };
      } else {
        handleNoGpsResults(formattedAddress, result, carioConsignment, logger);
      }
    }

    // Always update devices to ensure Cario updates are reflected.
    //
    existingConsignment.devices = [];
    for (let i = 0; i < carioConsignment.transportUnits.length; i++) {
      const transportUnit = carioConsignment.transportUnits[i];
      const trackedAssets = transportUnit?.assets?.filter((asset) => asset.class === TRACKER_ASSET_CLASS) || [];
      if (trackedAssets.length > 0) {
        const asset = trackedAssets[0]; // Only a single device per TU possible (so far).
        existingConsignment.devices.push({
          serialNumber: asset.reference,
          deviceName: asset.name,
          transportUnitId: transportUnit.id!,
        });
      }
    }

    if (existingConsignment.currentStatus !== ConsignmentStatusEvent.DEL) {
      // Never roll back from delivered
      // Termination time is currentMilestoneStatus == DEL + timestamp
      existingConsignment.currentStatus = parseStatusEvent(payload.CurrentStatus);
      existingConsignment.currentStatusTime = new Date(payload.StatusChanged).toISOString();

      if (existingConsignment.currentStatus === ConsignmentStatusEvent.DEL) {
        // If we've been delivered, update the delivery time.
        existingConsignment.deliveredTime = new Date(existingConsignment.currentStatusTime).toISOString();
      }
    }

    console.log("Writing consignment", existingConsignment);

    await consignmentRepository.upsert(existingConsignment);
  } catch (err) {
    console.log("Error processing new consignment message", err);
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

function newConsignment(payload: CarioCallback, carioConsignment: IConsignment): PersistedConsignment {
  return {
    id: payload.Id, // guid
    carioId: carioConsignment.id,
    connoteNumber: carioConsignment.connoteNumber,
    createTime: payload.StatusChanged,
    currentStatus: parseStatusEvent(payload.CurrentStatus),
    currentStatusTime: payload.StatusChanged,
    lastConsignment: carioConsignment,
    devices: [],
    callbackHistory: [],
    consignmentHistory: [],
  };
}

function parsePayload(messageText: string): CarioCallback | undefined {
  const payload = JSON.parse(messageText);
  console.log("Got payload", payload);
  if (payload && payload.Id && payload.ConnoteNumber && payload.StatusChanged && payload.CurrentStatus) {
    return payload as CarioCallback;
  }
  return undefined;
}

async function handleDeadletter(
  message: DequeuedMessageItem,
  deadLetterQueue: QueueMessageProvider,
  logger: TelemetryClient,
  reason: string,
) {
  console.log("Handling bad message", message.messageText, reason);
  logger.trackException({
    exception: new Error(reason),
    properties: {
      type: reason,
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

function handleNoGpsResults(address: string, result: any, consignment: IConsignment, logger: TelemetryClient) {
  console.log("Geocoding returned no results for the address", address, result, consignment.connoteNumber, consignment.id);
  logger.trackException({
    exception: new Error("Geocode returned no results for consignment: " + consignment.connoteNumber),
    properties: {
      type: "GeocodeReturnedNoResults",
      consignmentId: consignment.id,
      connoteNumber: consignment.connoteNumber,
      address: address,
      result: result,
    },
  });
}
