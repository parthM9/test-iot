import {
  ConsignmentsContainer,
  ConsignmentsPartitionKey,
  cosmosConfig,
  LocationsContainer,
  LocationsPartitionKey,
} from "../../common/cosmos/config";
import { EventHubConsumer } from "../../common/eventhub/EventHubConsumer";
import { consumerConfig, LocationConsumerGroup } from "../../common/eventhub/config";
import { processLocationError, processLocationEvents } from "./eventProcessor";
import { LocationRepository } from "../../common/repositories/location/LocationRepository";
import { ConsignmentRepository } from "../../common/repositories/consignment/ConsignmentRepository";
import { GeoCalculator } from "../../common/geocalc/GeoCalculator";
import { CarioAPIURL, CarioClient } from "../../common/cario/CarioClient";
import { Alerter } from "../../common/alerter/Alerter";
import { TelemetryClient } from "applicationinsights";

export const serviceName = "Location";

// EH
const eventHubConsumerGroup = LocationConsumerGroup;
const storageContainerName = "location";

// Cosmos
const containerId = LocationsContainer;
const partitionKey = LocationsPartitionKey;

async function main() {
  const logger = new TelemetryClient(process.env.APPINSIGHTS_INSTRUMENTATIONKEY || "not available");
  logger.commonProperties["service"] = serviceName;

  try {
    console.log("Starting " + serviceName);
    console.log("Consumer group " + eventHubConsumerGroup);
    logger.trackEvent({ name: "Starting" });

    const locationRepository = new LocationRepository({ ...cosmosConfig, containerId, partitionKey });
    const eventConsumer = new EventHubConsumer({ ...consumerConfig, eventHubConsumerGroup, storageContainerName });

    const carioClient = new CarioClient(CarioAPIURL, process.env.CARIO_API_GATEWAY_TOKEN, logger);
    const geoCalculator = new GeoCalculator();
    const consignmentRepository = new ConsignmentRepository({
      ...cosmosConfig,
      containerId: ConsignmentsContainer,
      partitionKey: ConsignmentsPartitionKey,
    });
    const alerter = new Alerter(carioClient, consignmentRepository, geoCalculator, logger);

    eventConsumer.subscribe(
      async (events, context) => await processLocationEvents(events, context, locationRepository, alerter, logger),
      async (err, context) => await processLocationError(err, context, logger),
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
