import {
  ConsignmentsContainer,
  ConsignmentsPartitionKey,
  cosmosConfig,
  LocationsContainer,
  LocationsPartitionKey,
} from "../../common/cosmos/config";
import { processMessage } from "./eventProcessor";
import { QueueMessageProvider } from "../../common/queues/QueueMessageProvider";
import { GeoLocationDeadletterQueue, GeoLocationQueue } from "../../common/queues/Queues";
import { GoogleGeoLocation } from "../../common/geolocate/GoogleGeoLocation";
import { LocationRepository } from "../../common/repositories/location/LocationRepository";
import { CarioAPIURL, CarioClient } from "../../common/cario/CarioClient";
import { GeoCalculator } from "../../common/geocalc/GeoCalculator";
import { ConsignmentRepository } from "../../common/repositories/consignment/ConsignmentRepository";
import { Alerter } from "../../common/alerter/Alerter";
import { TelemetryClient } from "applicationinsights";

export const serviceName = "Geolocation";

const storageQueueName = GeoLocationQueue;

// Cosmos
const containerId = LocationsContainer;
const partitionKey = LocationsPartitionKey;

async function main() {
  const logger = new TelemetryClient(process.env.APPINSIGHTS_INSTRUMENTATIONKEY || "not available");
  logger.commonProperties["service"] = serviceName;

  try {
    console.log("Starting " + serviceName);
    console.log("Storage queue " + storageQueueName);
    logger.trackEvent({ name: "Starting" });

    const locationRepository = new LocationRepository({ ...cosmosConfig, containerId, partitionKey });
    const geoLocationQueue = await QueueMessageProvider.Create(process.env.STORAGE_CONNECTION_STRING, GeoLocationQueue);
    const deadLetterQueue = await QueueMessageProvider.Create(process.env.STORAGE_CONNECTION_STRING, GeoLocationDeadletterQueue);
    const geoLocator = new GoogleGeoLocation(process.env.GOOGLE_GEOLOCATION_APIKEY);

    const carioClient = new CarioClient(CarioAPIURL, process.env.CARIO_API_GATEWAY_TOKEN, logger);
    const geoCalculator = new GeoCalculator();
    const consignmentRepository = new ConsignmentRepository({
      ...cosmosConfig,
      containerId: ConsignmentsContainer,
      partitionKey: ConsignmentsPartitionKey,
    });
    const alerter = new Alerter(carioClient, consignmentRepository, geoCalculator, logger);

    geoLocationQueue.subscribe(
      async (message) => await processMessage(message, geoLocator, locationRepository, deadLetterQueue, alerter, logger),
      undefined,
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

const data = {
  SerNo: 181347,
  IMEI: "352753092930476",
  ICCID: "89610185002543609307",
  ProdId: 72,
  FW: "72.2.2.2",
  Records: [
    {
      SeqNo: 4689,
      Reason: 11,
      DateUTC: "2021-07-07 11:41:57",
      Fields: [
        {
          APs: [
            {
              MAC: "74:83:C2:B7:D0:ED",
              Sig: -32,
              Ch: 11,
            },
            {
              MAC: "00:1D:AA:7A:C9:40",
              Sig: -40,
              Ch: 8,
            },
            {
              MAC: "18:F1:45:AE:E6:63",
              Sig: -50,
              Ch: 6,
            },
            {
              MAC: "34:FC:B9:50:02:E1",
              Sig: -78,
              Ch: 11,
            },
            {
              MAC: "34:FC:B9:50:02:E0",
              Sig: -78,
              Ch: 11,
            },
            {
              MAC: "34:FC:B9:9F:1B:81",
              Sig: -78,
              Ch: 6,
            },
            {
              MAC: "34:FC:B9:9F:1B:80",
              Sig: -78,
              Ch: 6,
            },
            {
              MAC: "18:E8:29:57:FD:75",
              Sig: -88,
              Ch: 11,
            },
            {
              MAC: "F4:F2:6D:CA:C6:EA",
              Sig: -89,
              Ch: 11,
            },
          ],
          FType: 25,
        },
        {
          Towers: [
            {
              CID: 137561869,
              LAC: 12384,
              MCC: 505,
              MNC: 1,
            },
          ],
          FType: 28,
        },
        {
          DIn: 4,
          DOut: 0,
          DevStat: 2,
          FType: 2,
        },
        {
          AnalogueData: {
            "1": 5344,
            "3": 1520,
            "4": 99,
            "5": 5310,
          },
          FType: 6,
        },
      ],
    },
  ],
};

const iotHubMessage = {
  systemProperties: {
    "iothub-connection-device-id": "YabbyWifi181347",
    "iothub-connection-auth-method": '{"scope":"hub","type":"sas","issuer":"iothub","acceptingIpFilterRule":null}',
    "iothub-connection-auth-generation-id": "637406822185199085",
    "iothub-enqueuedtime": "2021-07-07T11:42:08.746Z",
    "iothub-message-source": "Telemetry",
    "x-opt-sequence-number": 809,
    "x-opt-offset": "296352746384",
    "x-opt-enqueued-time": "2021-07-07T11:42:09.363Z",
    "content-type": {
      Value: "application/json; charset=utf-8",
      ValueSize: 31,
    },
    "content-encoding": {
      Value: "",
      ValueSize: 0,
    },
  },
  properties: {},
  data: data,
};
