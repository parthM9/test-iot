import { CosmosProvider } from "../../common/cosmos/CosmosProvider";
import { cosmosConfig, RawMessagesContainer, RawMessagesPartitionKey } from "../../common/cosmos/config";
import { EventHubConsumer } from "../../common/eventhub/EventHubConsumer";
import { consumerConfig, DefaultConsumerGroup } from "../../common/eventhub/config";
import TelemetryClient from "applicationinsights/out/Library/TelemetryClient";
import { processError, processEvents } from "./eventProcessor";
import { GeoLocationQueue, RawEventsDeadletterQueue } from "../../common/queues/Queues";
import { QueueMessageProvider } from "../../common/queues/QueueMessageProvider";

export const serviceName = "Ingester";

// EH
const eventHubConsumerGroup = DefaultConsumerGroup;
const storageContainerName = "ingester";

// Cosmos
const containerId = RawMessagesContainer;
const partitionKey = RawMessagesPartitionKey;

async function main() {
  const logger = new TelemetryClient(process.env.APPINSIGHTS_INSTRUMENTATIONKEY || "not available");
  logger.commonProperties["service"] = serviceName;

  try {
    console.log("Starting " + serviceName);
    console.log("Consumer group " + eventHubConsumerGroup);
    logger.trackEvent({ name: "Starting" });

    const cosmosProvider = await CosmosProvider.Create({ ...cosmosConfig, containerId, partitionKey });
    const eventConsumer = new EventHubConsumer({ ...consumerConfig, eventHubConsumerGroup, storageContainerName });
    const geolocationQueueProvider = await QueueMessageProvider.Create(process.env.STORAGE_CONNECTION_STRING, GeoLocationQueue);
    const deadletterQueueProvider = await QueueMessageProvider.Create(process.env.STORAGE_CONNECTION_STRING, RawEventsDeadletterQueue);

    eventConsumer.subscribe(
      async (events, context) =>
        await processEvents(events, context, cosmosProvider, geolocationQueueProvider, deadletterQueueProvider, logger),
      async (err, context) => await processError(err, context, logger),
    );

    console.log("Started");
    logger.trackEvent({ name: "Started" });
  } catch (error) {
    console.log("Error", error);
    logger.trackException({ exception: error });
    throw error;
  }

  // Block
  while (true) {
    await new Promise((resolve) => {
      setTimeout(async () => {
        resolve(null);
      }, 30000);
    });
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
