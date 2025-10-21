import { CosmosConfig } from "./CosmosProvider";

export const RawMessagesContainer = "RawMessages";
export const RawMessagesPartitionKey = "/id";

export const LocationsContainer = "Locations";
export const LocationsPartitionKey = "/deviceId";

export const ConsignmentsContainer = "Consignments";
export const ConsignmentsPartitionKey = "/id";

export const cosmosConfig: CosmosConfig = {
  connectionString: process.env.COSMOS_CONNECTION_STRING || "",
  databaseId: "IOT",
  containerId: "",
  partitionKey: "",
};
