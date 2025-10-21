import { ConsignmentStatusEvent } from "../../repositories/consignment/consignment";
import { FakeConsignmentRepository } from "../../repositories/consignment/tests/FakeConsignmentRepository";
import { FakeLocationRepository } from "../../repositories/location/tests/FakeLocationRepository";
import { getFirstCallbackTime, getLocationsForConsignment } from "../TrackingClient";

describe("tracking client tests", () => {
  it("first is returned", () => {
    const callbacks: any[] = [
      { StatusChanged: "2021-09-14T03:28:13.0461576Z" },
      { StatusChanged: "2021-09-14T03:23:13.0461576Z" },
      { StatusChanged: "2021-09-14T03:24:13.0461576Z" },
    ];

    const first = getFirstCallbackTime(callbacks);

    expect(first).toEqual("2021-09-14T03:23:13.0461576Z");
  });

  it("locations are sorted in order of date", async () => {
    const locationRepository = new FakeLocationRepository();
    const consignmentRepository = new FakeConsignmentRepository();
    const consignment: any = {
      createTime: "2021-09-14T00:01:00.0000000Z",
      devices: [{ serialNumber: "123" }],
    };

    locationRepository.locations["123"] = [
      { timeUTC: "2021-09-14T00:03:00.0000000Z", location: { lat: 1, long: 2, timeUTC: "2021-09-14T00:03:00.0000000Z" } } as any,
      { timeUTC: "2021-09-14T00:01:00.0000000Z", location: { lat: 1, long: 2, timeUTC: "2021-09-14T00:01:00.0000000Z" } } as any,
      { timeUTC: "2021-09-14T00:02:00.0000000Z", location: { lat: 1, long: 2, timeUTC: "2021-09-14T00:02:00.0000000Z" } } as any,
    ];

    const locations = await getLocationsForConsignment(consignment, locationRepository, consignmentRepository);

    expect(locations[0].locations[0].timeUTC).toEqual("2021-09-14T00:01:00.0000000Z");
    expect(locations[0].locations[1].timeUTC).toEqual("2021-09-14T00:02:00.0000000Z");
    expect(locations[0].locations[2].timeUTC).toEqual("2021-09-14T00:03:00.0000000Z");
  });

  it("record time is used over the gps time", async () => {
    const locationRepository = new FakeLocationRepository();
    const consignmentRepository = new FakeConsignmentRepository();
    const consignment: any = {
      createTime: "2021-09-14T00:02:00.000Z",
      devices: [{ serialNumber: "123" }],
    };
    locationRepository.locations["123"] = [
      { timeUTC: "2021-09-14T00:03:00.000Z", location: { lat: 1, long: 2, timeUTC: "2021-09-14T00:04:00.000Z" } } as any,
    ];

    const locations = await getLocationsForConsignment(consignment, locationRepository, consignmentRepository);

    expect(locations[0].locations[0].timeUTC).toEqual("2021-09-14T00:03:00.000Z"); // record time, not GPS time
  });

  it("multiple devices", async () => {
    const locationRepository = new FakeLocationRepository();
    const consignmentRepository = new FakeConsignmentRepository();
    const consignment: any = {
      createTime: "2021-09-13T00:02:00.000Z",
      devices: [{ serialNumber: "123" }, { serialNumber: "abc" }],
    };
    locationRepository.locations["123"] = [
      { timeUTC: "2021-09-14T00:03:00.000Z", location: { lat: 1, long: 2, timeUTC: "2021-09-14T00:04:00.000Z" } } as any,
    ];
    locationRepository.locations["abc"] = [
      { timeUTC: "2021-09-13T00:03:00.000Z", location: { lat: 1, long: 2, timeUTC: "2021-09-13T00:04:00.000Z" } } as any,
    ];

    const locations = await getLocationsForConsignment(consignment, locationRepository, consignmentRepository);

    expect(locations[0].deviceId).toEqual("123");
    expect(locations[0].locations[0].timeUTC).toEqual("2021-09-14T00:03:00.000Z");
    expect(locations[1].deviceId).toEqual("abc");
    expect(locations[1].locations[0].timeUTC).toEqual("2021-09-13T00:03:00.000Z");
  });

  describe("no delivery info", () => {
    it("when delivered and subsequent consignment, only this consignments locations returned", async () => {
      const locationRepository = new FakeLocationRepository();
      const consignmentRepository = new FakeConsignmentRepository();
      const consignment: any = {
        createTime: "2021-09-14T00:02:00.000Z",
        devices: [{ serialNumber: "123" }],
        currentStatus: ConsignmentStatusEvent.DEL,
        deliveredTime: "2021-09-14T00:03:01.000Z",
      };

      locationRepository.locations["123"] = [
        { timeUTC: "2021-09-14T00:03:00.000Z", location: { lat: 1, long: 2, timeUTC: "2021-09-14T00:03:00.000Z" } } as any,
        { timeUTC: "2021-09-14T00:04:00.000Z", location: { lat: 1, long: 2, timeUTC: "2021-09-14T00:04:00.000Z" } } as any,
      ];

      const locations = await getLocationsForConsignment(consignment, locationRepository, consignmentRepository);

      expect(locations[0].locations.length).toEqual(1);
      expect(locations[0].locations[0].timeUTC).toEqual("2021-09-14T00:03:00.000Z");
    });

    it("when not delivered only this consignments locations are returned", async () => {
      const locationRepository = new FakeLocationRepository();
      const consignmentRepository = new FakeConsignmentRepository();

      // This consignment was created after with the same device id
      const subsequentConsignmentWithDevice: any = {
        connoteNumber: "def",
        createTime: "2021-09-14T03:10:01.000Z",
        devices: [{ serialNumber: "123" }],
      };

      const subsequentConsignmentWithDevice2: any = {
        connoteNumber: "def",
        createTime: "2021-09-14T04:10:01.000Z",
        devices: [{ serialNumber: "123" }],
      };

      consignmentRepository.consignmentsWithDeviceAfter.push(subsequentConsignmentWithDevice2);
      consignmentRepository.consignmentsWithDeviceAfter.push(subsequentConsignmentWithDevice);

      const consignment: any = {
        connoteNumber: "abc",
        createTime: "2021-09-14T02:00:00.000Z",
        devices: [{ serialNumber: "123" }],
      };

      locationRepository.locations["123"] = [
        { timeUTC: "2021-09-14T03:00:00.000Z", location: { lat: 1, long: 2, timeUTC: "2021-09-14T03:00:00.000Z" } } as any,
        { timeUTC: "2021-09-14T04:00:00.000Z", location: { lat: 1, long: 2, timeUTC: "2021-09-14T04:00:00.000Z" } } as any,
        { timeUTC: "2021-09-14T05:00:00.000Z", location: { lat: 1, long: 2, timeUTC: "2021-09-14T05:00:00.000Z" } } as any,
      ];

      const locations = await getLocationsForConsignment(consignment, locationRepository, consignmentRepository);

      expect(locations[0].locations.length).toEqual(1);
      expect(locations[0].locations[0].timeUTC).toEqual("2021-09-14T03:00:00.000Z");
    });
  });
});
