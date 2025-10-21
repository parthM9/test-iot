import { TelemetryClient } from "applicationinsights";
import { Address, Asset, IConsignment, TransportUnit } from "../../../common/cario/generated/carioTypes";
import { FakeCarioClient } from "../../../common/cario/tests/FakeCarioClient";
import { FakeGoogleGeocodeClient } from "../../../common/geocode/tests/FakeGoogleGeocodeClient";
import { FakeQueue } from "../../../common/queues/tests/FakeQueue";
import {
  CarioCallback,
  ConsignmentStatusEvent,
  IPersistedConsignment,
  TRACKER_ASSET_CLASS,
} from "../../../common/repositories/consignment/consignment";
import { FakeConsignmentRepository } from "../../../common/repositories/consignment/tests/FakeConsignmentRepository";
import { FakeLocationRepository } from "../../../common/repositories/location/tests/FakeLocationRepository";
import { processMessage } from "../eventProcessor";
jest.mock("applicationinsights");

describe("consignment-state-updater event process tests", () => {
  let locationRepo: FakeLocationRepository;
  let consignmentRepo: FakeConsignmentRepository;
  let deadLetterQueue: FakeQueue;
  let carioClient: FakeCarioClient;
  let geoCodeClient: FakeGoogleGeocodeClient;
  let logger: TelemetryClient;

  beforeEach(() => {
    locationRepo = new FakeLocationRepository();
    consignmentRepo = new FakeConsignmentRepository();
    deadLetterQueue = new FakeQueue();
    carioClient = new FakeCarioClient();
    geoCodeClient = new FakeGoogleGeocodeClient();
    logger = new TelemetryClient("123");
  });

  it("canary", () => {
    expect(true).toBeTruthy();
  });

  it("too many dequeues deadletters", async () => {
    const message: any = { messageText: "abc", dequeueCount: 18 };
    await processMessage(message, consignmentRepo, deadLetterQueue as any, carioClient, geoCodeClient, logger);
    expect(deadLetterQueue.messageText).not.toBeUndefined();
  });

  describe("invalid payload", () => {
    it("missing id results in deadletter", async () => {
      const message: any = {
        messageText: JSON.stringify({
          ConnoteNumber: "AYCE074215",
          StatusChanged: "2021-09-14T03:28:13.0461576Z",
          CurrentStatus: "Created",
          PreviousStatus: null,
        }),
        dequeueCount: 0,
      };
      await processMessage(message, consignmentRepo, deadLetterQueue as any, carioClient, geoCodeClient, logger);
      expect(deadLetterQueue.messageText).not.toBeUndefined();
    });

    it("missing connote results in deadletter", async () => {
      const message: any = {
        messageText: JSON.stringify({
          Id: "AYCE074215",
          StatusChanged: "2021-09-14T03:28:13.0461576Z",
          CurrentStatus: "Created",
          PreviousStatus: null,
        }),
        dequeueCount: 0,
      };
      await processMessage(message, consignmentRepo, deadLetterQueue as any, carioClient, geoCodeClient, logger);
      expect(deadLetterQueue.messageText).not.toBeUndefined();
    });

    it("missing status changed time results in deadletter", async () => {
      const message: any = {
        messageText: JSON.stringify({
          Id: "AYCE074215",
          ConnoteNumber: "2021-09-14T03:28:13.0461576Z",
          PreviousStatus: null,
        }),
        dequeueCount: 0,
      };
      await processMessage(message, consignmentRepo, deadLetterQueue as any, carioClient, geoCodeClient, logger);
      expect(deadLetterQueue.messageText).not.toBeUndefined();
    });
  });

  it("missing cario consignment results in deadletter", async () => {
    const message: any = {
      messageText: JSON.stringify(getStatusMessage()),
      dequeueCount: 0,
    };
    await processMessage(message, consignmentRepo, deadLetterQueue as any, carioClient, geoCodeClient, logger);
    expect(deadLetterQueue.messageText).not.toBeUndefined();
  });

  it("new consignment is written", async () => {
    const statusMessage = getStatusMessage();
    const message: any = {
      messageText: JSON.stringify(statusMessage),
      dequeueCount: 0,
    };
    carioClient.consignment = getConsignment();
    geoCodeClient.addFakeResponse();
    await processMessage(message, consignmentRepo, deadLetterQueue as any, carioClient, geoCodeClient, logger);
    expect(consignmentRepo.upsertedConsignment).not.toBeUndefined();
    expect(consignmentRepo.upsertedConsignment.id).toEqual(statusMessage.Id);
    expect(consignmentRepo.upsertedConsignment.connoteNumber).toEqual(statusMessage.ConnoteNumber);
    expect(consignmentRepo.upsertedConsignment.createTime).toEqual(statusMessage.StatusChanged);
    expect(consignmentRepo.upsertedConsignment.deliveryCoordinates.lat).toEqual(1);
    expect(consignmentRepo.upsertedConsignment.deliveryCoordinates.long).toEqual(2);
  });

  it("devices are mapped", async () => {
    const statusMessage = getStatusMessage();
    const message: any = {
      messageText: JSON.stringify(statusMessage),
      dequeueCount: 0,
    };
    carioClient.consignment = getConsignment();
    geoCodeClient.addFakeResponse();
    await processMessage(message, consignmentRepo, deadLetterQueue as any, carioClient, geoCodeClient, logger);
    expect(consignmentRepo.upsertedConsignment.devices[0].serialNumber).toEqual(
      carioClient.consignment.transportUnits[0].assets[0].reference,
    );
    expect(consignmentRepo.upsertedConsignment.devices[0].deviceName).toEqual(carioClient.consignment.transportUnits[0].assets[0].name);
  });

  it("no geocode address is written if missing", async () => {
    const statusMessage = getStatusMessage();
    const message: any = {
      messageText: JSON.stringify(statusMessage),
      dequeueCount: 0,
    };
    carioClient.consignment = getConsignment();
    await processMessage(message, consignmentRepo, deadLetterQueue as any, carioClient, geoCodeClient, logger);
    expect(consignmentRepo.upsertedConsignment.deliveryCoordinates).toBeUndefined();
  });

  it("if not delivered, delivery time is not set", async () => {
    const statusMessage = getStatusMessage();
    const message: any = {
      messageText: JSON.stringify(statusMessage),
      dequeueCount: 0,
    };
    carioClient.consignment = getConsignment();
    geoCodeClient.addFakeResponse();
    await processMessage(message, consignmentRepo, deadLetterQueue as any, carioClient, geoCodeClient, logger);
    expect(consignmentRepo.upsertedConsignment.deliveredTime).toBeUndefined();
  });

  it("if delivered, delivery time is set", async () => {
    const statusMessage = { ...getStatusMessage(), CurrentStatus: ConsignmentStatusEvent.DEL };
    const message: any = {
      messageText: JSON.stringify(statusMessage),
      dequeueCount: 0,
    };
    carioClient.consignment = getConsignment();
    consignmentRepo.consignment = getExistingConsignment();
    geoCodeClient.addFakeResponse();
    await processMessage(message, consignmentRepo, deadLetterQueue as any, carioClient, geoCodeClient, logger);
    expect(consignmentRepo.upsertedConsignment.currentStatus).toEqual(statusMessage.CurrentStatus);
    expect(consignmentRepo.upsertedConsignment.deliveredTime).toEqual(statusMessage.StatusChanged);
  });

  it("delivered status cannot go back to created", async () => {
    const statusMessage = getStatusMessage();
    const message: any = {
      messageText: JSON.stringify(statusMessage),
      dequeueCount: 0,
    };
    carioClient.consignment = getConsignment();
    consignmentRepo.consignment = { ...getExistingConsignment(), currentStatus: ConsignmentStatusEvent.DEL, deliveredTime: "123" };
    geoCodeClient.addFakeResponse();
    await processMessage(message, consignmentRepo, deadLetterQueue as any, carioClient, geoCodeClient, logger);
    expect(consignmentRepo.upsertedConsignment.currentStatus).toEqual(ConsignmentStatusEvent.DEL);
    expect(consignmentRepo.upsertedConsignment.deliveredTime).toEqual(consignmentRepo.consignment.deliveredTime);
  });
});

function getConsignment(): IConsignment {
  const consignment: Partial<IConsignment> = {
    id: 123,
    connoteNumber: "AYCE074215",
    deliveryAddress: Address.fromJS({
      id: 0,
      code: null,
      name: "Daniel Cordi",
      line1: "31 Kirsty Court",
      line2: null,
      line3: null,
      location: {
        id: 14228,
        locality: "KELLYVILLE",
        state: "NSW",
        postcode: "2155",
        country: {
          id: 36,
          isO2: "AU",
          isO3: "AUS",
          name: "Australia",
        },
      },
    }),
    transportUnits: [
      TransportUnit.fromJS({
        assets: [
          Asset.fromJS({
            class: TRACKER_ASSET_CLASS,
            name: "myTracker",
            reference: "device123",
          }),
        ],
      }),
    ],
  };
  return consignment as any;
}

function getStatusMessage(): CarioCallback {
  return {
    Id: "0d5935a0-82da-4063-8879-99415f29cfb1",
    ConnoteNumber: "AYCE074215",
    StatusChanged: "2021-09-14T03:28:13.046Z",
    CurrentStatus: "Created",
    PreviousStatus: null,
  };
}

export function getExistingConsignment(): IPersistedConsignment {
  const con: Partial<IPersistedConsignment> = {
    id: "0d5935a0-82da-4063-8879-99415f29cfb1",
    carioId: 123,
    connoteNumber: "AYCE074215",
    createTime: "123",
    currentStatus: ConsignmentStatusEvent.Created,
    callbackHistory: [],
    consignmentHistory: [],
  };
  return con as any;
}
