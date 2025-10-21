import { MessagingError, PartitionContext, ReceivedEventData } from "@azure/event-hubs";
import TelemetryClient from "applicationinsights/out/Library/TelemetryClient";
import { ICosmosProvider } from "../../common/cosmos/ICosmosProvider";
import crypto from "crypto";
import { fixCosmosId } from "../../common/utils";
import { QueueMessageProvider } from "../../common/queues/QueueMessageProvider";
import { IOTHubDeviceMessage } from "../../common/types/IOTHubDeviceMessage";

export async function processEvents(
  events: ReceivedEventData[],
  context: PartitionContext,
  eventPublisher: ICosmosProvider,
  geoLocationQueue: QueueMessageProvider,
  deadletterQueue: QueueMessageProvider,
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
    const queueWrites = [];

    for (const event of events) {
      const iotHubMessage = new IOTHubDeviceMessage(event);
      const messagePayload = iotHubMessage.payload;
      writes.push(persistRawMessage(event, eventPublisher, deadletterQueue, logger));
      if (messagePayload.requiresGeoLocation()) {
        queueWrites.push(sendToGeoLocator(iotHubMessage, geoLocationQueue, logger));
      }
    }

    await Promise.all(writes);
    await Promise.all(queueWrites);

    await context.updateCheckpoint(events[events.length - 1]);
  } catch (err) {
    console.log("Error in processEvents", err);
    logger.trackException({
      exception: err,
      properties: { type: "FailedToProcessEvents" },
    });
  }
}

async function persistRawMessage(
  event: ReceivedEventData,
  eventPublisher: ICosmosProvider,
  deadletterQueue: QueueMessageProvider,
  logger: TelemetryClient,
) {
  try {
    const id = crypto.createHash("sha256").update(JSON.stringify(event.body)).digest("base64");
    const doc = {
      id: fixCosmosId(id),
      hash: "sha256",
      version: 1.0,
      message: event,
    };

    eventPublisher.writeEvent(doc);
  } catch (err) {
    const serializedEvent = JSON.stringify(event);
    console.log("Failed to process event", err, serializedEvent);
    logger.trackException({
      exception: err,
      properties: {
        type: "FailedToProcessEvent",
        event: serializedEvent,
      },
    });
    await deadletterQueue.putMessage(serializedEvent);
    console.log("Event added to the dead letter queue", err, serializedEvent);
  }
}

async function sendToGeoLocator(message: IOTHubDeviceMessage, geoLocationQueue: QueueMessageProvider, logger: TelemetryClient) {
  try {
    await geoLocationQueue.putMessage(JSON.stringify(message.event));
  } catch (err) {
    console.log("Failed to check if geolocation required", err);
    logger.trackException({
      exception: err,
      properties: {
        type: "FailedToCheckForGeoLocation",
        event: JSON.stringify(event),
      },
    });
  }
}

export async function processError(error: Error | MessagingError, context: PartitionContext, logger: TelemetryClient) {
  console.log("Error processing events", error);
  logger.trackException({
    exception: error,
    properties: { type: "FailedToProcessEvents" },
  });
}
