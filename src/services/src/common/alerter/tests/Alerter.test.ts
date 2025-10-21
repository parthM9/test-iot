import { FakeCarioClient } from "../../cario/tests/FakeCarioClient";
import { GeoCalculator } from "../../geocalc/GeoCalculator";
import { FakeGeoCalculator } from "../../geocalc/tests/FakeGeoCalculator";
import { IPersistedConsignment } from "../../repositories/consignment/consignment";
import { FakeConsignmentRepository } from "../../repositories/consignment/tests/FakeConsignmentRepository";
import { Alerter } from "../Alerter";

describe("Alerter test", () => {
  let carioClient: FakeCarioClient;
  let consignmentRepo: FakeConsignmentRepository;
  let geoCalculator: GeoCalculator;
  let alerter: Alerter;

  beforeEach(() => {
    carioClient = new FakeCarioClient();
    consignmentRepo = new FakeConsignmentRepository();
    geoCalculator = new GeoCalculator();
    alerter = new Alerter(carioClient, consignmentRepo, geoCalculator);
  });

  it("canaries", () => expect(true).toBeTruthy());

  it("no consignment returns", async () => {
    const loc: any = { location: { lat: -33.7978148, long: 150.8628174 } };
    await alerter.alertForDeviceIfNeeded("123", loc, 1500);
  });

  it("consignment outside range doesn't alert", async () => {
    const cons: Partial<IPersistedConsignment> = {
      id: "123",
      connoteNumber: "123abc",
      deliveryCoordinates: {
        lat: -33.8455662,
        long: 151.0434663,
      },
    };
    consignmentRepo.consignmentsOutForDelivery = [cons as any];
    const loc: any = { location: { lat: -33.7978148, long: 150.8628174 } };
    await alerter.alertForDeviceIfNeeded("123", loc, 1500);
    expect(carioClient.sentEvents.length).toEqual(0);
  });

  it("consignment inside range alerts", async () => {
    const cons: Partial<IPersistedConsignment> = {
      id: "123",
      connoteNumber: "123abc",
      deliveryCoordinates: {
        lat: -33.8455662,
        long: 151.0434663,
      },
    };
    consignmentRepo.consignmentsOutForDelivery = [cons as any];
    const loc: any = { location: { lat: -33.7978148, long: 150.8628174 } };
    await alerter.alertForDeviceIfNeeded("123", loc, 18000);
    expect(carioClient.sentEvents.length).toEqual(1);
  });

  it("consignment already alerted doesnt alert", async () => {
    const cons: Partial<IPersistedConsignment> = {
      id: "123",
      connoteNumber: "123abc",
      alertStatus: {
        alertSentAt: new Date().toISOString(),
        distanceToDestination: 123,
      },
      deliveryCoordinates: {
        lat: -33.8455662,
        long: 151.0434663,
      },
    };
    consignmentRepo.consignmentsOutForDelivery = [cons as any];
    const loc: any = { location: { lat: -33.7978148, long: 150.8628174 } };
    await alerter.alertForDeviceIfNeeded("123", loc, 18000);
    expect(carioClient.sentEvents.length).toEqual(0);
  });
});
