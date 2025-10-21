import express from "express";
import bodyParser from "body-parser";
import { CarioAPIURL, CarioClient } from "../../common/cario/CarioClient";
import { QueueMessageProvider } from "../../common/queues/QueueMessageProvider";
import { NewConsignmentQueue } from "../../common/queues/Queues";
import { CosmosProvider } from "../../common/cosmos/CosmosProvider";
import {
  ConsignmentsContainer,
  ConsignmentsPartitionKey,
  cosmosConfig,
  LocationsContainer,
  LocationsPartitionKey,
} from "../../common/cosmos/config";
import { TrackingClient } from "../../common/tracking/TrackingClient";
import { LocationRepository } from "../../common/repositories/location/LocationRepository";
import { ConsignmentRepository } from "../../common/repositories/consignment/ConsignmentRepository";
import { TelemetryClient } from "applicationinsights";

// Constants
const PORT = 8080;
const KEY = "aFdtWnE0dDd3IXokQyZGKUpATmNSZlVqWG4ycjV1OHgvQT9EKkctS2FQZFNnVmtZcDNzNnY5eSRCJkUpSCtNYg==";

async function main() {
  const logger = new TelemetryClient(process.env.APPINSIGHTS_INSTRUMENTATIONKEY || "not available");
  logger.commonProperties["service"] = "iot-api";

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

  const newConsignmentQueue = await QueueMessageProvider.Create(process.env.STORAGE_CONNECTION_STRING, NewConsignmentQueue);
  const carioClient = new CarioClient(CarioAPIURL, process.env.CARIO_API_GATEWAY_TOKEN, logger);
  const trackingClient = new TrackingClient(carioClient, consignmentRepository, locationRepository);

  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.post("/api/consignments", async (req, res) => {
    const key = req.query.key;
    if (key === KEY) {
      console.log("Got valid request", req.body);
      await newConsignmentQueue.putMessage(JSON.stringify(req.body));
      res.sendStatus(200);
    } else {
      console.log("Got invalid request", req.body, req.query);
      res.type("application/json");
      res.status(401).send({ error: "Unauthorized" });
    }
  });

  app.get("/api/tracking/consignments/:connoteNumberOrConsignmentGuid", (req, res) => {
    console.log("Requesting consignment", req.params.connoteNumberOrConsignmentGuid);
    trackingClient
      .getConsignment(req.params.connoteNumberOrConsignmentGuid)
      .then((connote) => {
        if (connote) {
          res.status(200).send(connote);
        } else {
          res.sendStatus(404);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        logger.trackException({ exception: error });
        res.status(500).send({ error: error.message });
      });
  });

  app.listen(PORT, () => {
    console.log("Started on PORT " + PORT);
  });
}

(async () => {
  await main();
  console.log("Main exited");
})().catch((e) => {
  console.error(e);
});
