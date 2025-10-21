import { CosmosProvider } from "../../common/cosmos/CosmosProvider";
import {
  ConsignmentsContainer,
  ConsignmentsPartitionKey,
  cosmosConfig,
  LocationsContainer,
  LocationsPartitionKey,
  RawMessagesContainer,
  RawMessagesPartitionKey,
} from "../../common/cosmos/config";
import { EventHubConsumer } from "../../common/eventhub/EventHubConsumer";
import { consumerConfig } from "../../common/eventhub/config";
import TelemetryClient from "applicationinsights/out/Library/TelemetryClient";
import { Client, Message } from "azure-iot-device";
import { Http } from "azure-iot-device-http";
import { ConsignmentRepository } from "../../common/repositories/consignment/ConsignmentRepository";
import { LocationRepository } from "../../common/repositories/location/LocationRepository";
import { ConflictResolutionMode } from "@azure/cosmos";
import moment from "moment";
import { getGpsMessage } from "./messages";
import { ConsignmentStatusEvent, PersistedConsignment } from "../../common/repositories/consignment/consignment";
import { IoTHuBClient } from "../../common/iothub/IotHubClient";

export const serviceName = "Replay";

// EH
const eventHubConsumerGroup = "$Default";
const storageContainerName = "replay";

// Cosmos
const containerId = RawMessagesContainer;
const partitionKey = RawMessagesPartitionKey;

//const containerId = LocationsContainer;
//const partitionKey = LocationsPartitionKey;

async function main() {
  const logger = new TelemetryClient(process.env.APPINSIGHTS_INSTRUMENTATIONKEY || "not available");
  logger.commonProperties["service"] = serviceName;

  try {
    const consignmentRepository = new ConsignmentRepository({
      ...cosmosConfig,
      containerId: ConsignmentsContainer,
      partitionKey: ConsignmentsPartitionKey,
    });

    const locationRepository = new LocationRepository({
      ...cosmosConfig,
      containerId: LocationsContainer,
      partitionKey: LocationsPartitionKey,
    });

    const iotHubClient = new IoTHuBClient(process.env.IOTHUB_DEVICE_CONNECTION_STRING);

    const iotHubDeviceName = "202914-YabbyGps";
    const deviceId = 202914;
    const message = getGpsMessage(deviceId, { lat: -33.8056731, long: 150.91681 });
    //await iotHubClient.sendMessages(iotHubDeviceName, [message]);

    //const cons = await consignmentRepository.get("0d5935a0-82da-4063-8879-99415f29cfb1");

    //cons.currentStatus = ConsignmentStatusEvent.OBFD;
    //await consignmentRepository.upsert(cons);

    //console.log(cons.currentStatus);
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
