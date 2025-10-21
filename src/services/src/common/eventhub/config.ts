import { ConsumerConfig } from "./EventHubConsumer";

export const DefaultConsumerGroup = "$Default";
export const LocationConsumerGroup = "location";

export const consumerConfig: ConsumerConfig = {
  eventHubConsumerGroup: "",
  eventHubConnectionString: process.env.IOTHUB_DEFAULT_ENDPOINT_CONNECTION_STRING || "",
  eventHubName: "iot-australiasoutheast",

  // Blob check pointing
  storageConnectionString: process.env.STORAGE_CONNECTION_STRING || "",
  storageContainerName: "",
};
