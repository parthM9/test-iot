import { EventHubConsumerClient, ProcessEventsHandler, ProcessErrorHandler, Subscription } from "@azure/event-hubs";
import { ContainerClient } from "@azure/storage-blob";
import { BlobCheckpointStore } from "@azure/eventhubs-checkpointstore-blob";
import { IEventHubConsumer } from "./IEventHubConsumer";

export type ConsumerConfig = {
  eventHubConsumerGroup: string;
  eventHubConnectionString: string;
  eventHubName: string;

  // Blob check pointing
  storageConnectionString: string;
  storageContainerName: string;
};

export class EventHubConsumer implements IEventHubConsumer {
  private consumerClient: EventHubConsumerClient;
  private subscription: Subscription | undefined;

  constructor(config: ConsumerConfig) {
    const containerClient = new ContainerClient(config.storageConnectionString, config.storageContainerName);
    const checkpointStore = new BlobCheckpointStore(containerClient);
    // Create a consumer client for the event hub by specifying the checkpoint store.
    this.consumerClient = new EventHubConsumerClient(
      config.eventHubConsumerGroup,
      config.eventHubConnectionString,
      config.eventHubName,
      checkpointStore,
    );
  }

  subscribe(processEvents: ProcessEventsHandler, processError: ProcessErrorHandler) {
    this.subscription = this.consumerClient.subscribe({
      processEvents,
      processError,
    });
  }

  dispose() {
    if (this.subscription && this.subscription.isRunning) {
      this.subscription.close();
    }

    if (this.consumerClient) {
      this.consumerClient.close();
    }
  }
}
