import { CarioClient } from "../cario/CarioClient";
import { IConsignmentStatus } from "../cario/generated/carioTypes";
import { ILocationRepository } from "../repositories/location/ILocationRepository";
import { CarioCallback, ConsignmentStatusEvent, IPersistedConsignment, TRACKER_ASSET_CLASS } from "../repositories/consignment/consignment";
import { IConsignmentRepository } from "../repositories/consignment/ConsignmentRepository";
import { validate as uuidValidate } from "uuid";
import { DeviceLocations, GpsLocation, ITrackedConsignment, TrackedConsignment } from "./types";
import moment from "moment";

export class TrackingClient {
  constructor(
    private readonly carioClient: CarioClient,
    private readonly consignmentRepository: IConsignmentRepository,
    private readonly locationRepository: ILocationRepository,
  ) {}

  async getConsignment(connoteNumberOrConsignmentGuid: string): Promise<ITrackedConsignment | undefined> {
    const consignment = await this.carioClient.GetOrQueryConsignment(connoteNumberOrConsignmentGuid);
    if (!consignment || !consignment.connoteNumber) {
      return undefined;
    }

    const shouldObfuscateDetails = uuidValidate(connoteNumberOrConsignmentGuid) === false;

    let locations: DeviceLocations[] = [];

    console.log("Looking for consignment", consignment.connoteNumber);
    const ourConsignment = await this.consignmentRepository.getByConnote(consignment.connoteNumber);
    console.log("Got our consignment", ourConsignment);
    if (ourConsignment) {
      // We know it's being tracked by us now...
      locations = await getLocationsForConsignment(ourConsignment, this.locationRepository, this.consignmentRepository);
    }

    return new TrackedConsignment(consignment, locations, shouldObfuscateDetails, ourConsignment);
  }

  hasTrackingEnabled(consignment: IConsignmentStatus) {
    return consignment.transportUnits.flatMap((tu) => tu.assets).filter((asset) => asset.class === TRACKER_ASSET_CLASS);
  }
}

export function getFirstCallbackTime(callbacks: CarioCallback[]): string {
  return callbacks.map((cb) => cb.StatusChanged).sort()[0];
}

export async function getLocationsForConsignment(
  consignment: IPersistedConsignment,
  locationRepository: ILocationRepository,
  consignmentRepository: IConsignmentRepository,
): Promise<DeviceLocations[]> {
  // We know it's being tracked by us now...
  const firstDevice = consignment.devices[0];
  if (!firstDevice) {
    console.log("This consignment has no devices for some reason", consignment);
    return [];
  }

  const startTime = consignment.createTime;

  const consignmentsForDeviceAfterThisOne = await consignmentRepository.getConsignmentsWithDeviceAfter(
    consignment.connoteNumber,
    firstDevice.serialNumber,
    startTime,
  );

  // If it's delivered, then use the end time, otherwise no end time.
  let endTime =
    consignment.currentStatus === ConsignmentStatusEvent.DEL && consignment.deliveredTime ? consignment.deliveredTime : undefined;

  if (!endTime && consignmentsForDeviceAfterThisOne.length > 0) {
    // This consignment hasn't been "delivered", however the device has been attached to other
    // consignments in the meantime.  We need to set the endTime to a time prior to the next
    // consignment that used the device
    endTime = moment.utc(consignmentsForDeviceAfterThisOne[0].createTime).subtract(1, "minute").toISOString();

    console.log("Setting new end time", endTime);
  }

  const queryPromises: Record<string, Promise<GpsLocation[]>> = {};

  for (let i = 0; i < consignment.devices.length; i++) {
    const deviceId = consignment.devices[i].serialNumber;
    queryPromises[deviceId] = getLocationsForDevice(locationRepository, deviceId, startTime, endTime);
  }

  const locations: DeviceLocations[] = [];

  for (let i = 0; i < consignment.devices.length; i++) {
    const deviceId = consignment.devices[i].serialNumber;
    const deviceLocation: DeviceLocations = {
      deviceId: deviceId,
      locations: await queryPromises[deviceId],
    };
    locations.push(deviceLocation);
  }

  return locations;
}

export async function getLocationsForDevice(
  locationRepository: ILocationRepository,
  deviceId: string,
  startTime: string,
  endTime: string | undefined,
): Promise<GpsLocation[]> {
  const locations = await locationRepository.getLocationsForDevice(deviceId, startTime, endTime);

  if (locations) {
    return locations
      .map((loc) => ({
        lat: loc.location.lat,
        long: loc.location.long,
        timeUTC: loc.timeUTC,
        internalTemperature: loc.internalTemperature,
        internalVoltage: loc.internalVoltage,
        remainingBatteryPercentage: loc.remainingBatteryPercentage,
      }))
      .sort(function (a, b) {
        return sortByTime(a.timeUTC, b.timeUTC);
      });
  }

  return [];
}

export function sortByTime(a: string, b: string, asc: boolean = true) {
  if (asc) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  return a > b ? -1 : a < b ? 1 : 0;
}
