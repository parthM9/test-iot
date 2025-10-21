import { PartitionContext, ProcessErrorHandler, ProcessEventsHandler, ReceivedEventData } from "@azure/event-hubs";

export interface IEventHubConsumer {
  subscribe(processEvents: ProcessEventsHandler, processError: ProcessErrorHandler);
}
