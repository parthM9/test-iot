import { IDeviceLocation } from "./types";

export interface ILocationRepository {
  getLocationsForDevice(externalDeviceId: string, startTime: string, endTime?: string | undefined): Promise<IDeviceLocation[]>;
  writeLocation(location: IDeviceLocation): Promise<void>;
}
