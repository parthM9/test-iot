import { ConsignmentsContainer, ConsignmentsPartitionKey, cosmosConfig } from "../../common/cosmos/config";
import { processMessage } from "./eventProcessor";
import { QueueMessageProvider } from "../../common/queues/QueueMessageProvider";
import { NewConsignmentDeadletterQueue, NewConsignmentQueue } from "../../common/queues/Queues";
import { CarioAPIURL, CarioClient } from "../../common/cario/CarioClient";
import { GoogleGeocodeClient } from "../../common/geocode/GoogleGeocodeClient";
import { ConsignmentRepository } from "../../common/repositories/consignment/ConsignmentRepository";
import { TelemetryClient } from "applicationinsights";

export const serviceName = "ConsignmentStateUpdater";

// Cosmos
const containerId = ConsignmentsContainer;
const partitionKey = ConsignmentsPartitionKey;

async function main() {
  const logger = new TelemetryClient(process.env.APPINSIGHTS_INSTRUMENTATIONKEY || "not available");
  logger.commonProperties["service"] = serviceName;

  try {
    console.log("Starting " + serviceName);

    logger.trackEvent({ name: "Starting" });

    const carioClient = new CarioClient(CarioAPIURL, process.env.CARIO_API_GATEWAY_TOKEN, logger);
    const geoCodeClient = new GoogleGeocodeClient(process.env.GOOGLE_GEOCODING_APIKEY, logger);
    const consignmentRepository = new ConsignmentRepository({ ...cosmosConfig, containerId, partitionKey });
    const newConsignmentsQueue = await QueueMessageProvider.Create(process.env.STORAGE_CONNECTION_STRING, NewConsignmentQueue);
    const deadLetterQueue = await QueueMessageProvider.Create(process.env.STORAGE_CONNECTION_STRING, NewConsignmentDeadletterQueue);

    newConsignmentsQueue.subscribe(
      async (message) => await processMessage(message, consignmentRepository, deadLetterQueue, carioClient, geoCodeClient, logger),
      undefined,
    );

    // const payload = {
    //   Id: "01632728-eaff-4f9d-befd-68a9881752a7",
    //   ConnoteNumber: "AYCE074215",
    //   StatusChanged: "2021-09-14T03:28:13.0461576Z",
    //   CurrentStatus: "Created",
    //   PreviousStatus: null,
    // };

    // const message = { messageId: "123", dequeueCount: 0, messageText: JSON.stringify(payload) } as any;

    // await processMessage(message, consignmentRepository, deadLetterQueue, carioClient, geoCodeClient, logger);

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
