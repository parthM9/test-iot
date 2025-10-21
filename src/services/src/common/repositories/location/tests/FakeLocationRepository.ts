import { ILocationRepository } from "../ILocationRepository";
import { IDeviceLocation } from "../types";

export class FakeLocationRepository implements ILocationRepository {
  public locations: Record<string, IDeviceLocation[]> = {};
  public upsertedLocations: IDeviceLocation[] = [];

  async getLocationsForDevice(externalDeviceId: string, startTime: string, endTime?: string | undefined): Promise<IDeviceLocation[]> {
    const locations = this.locations[externalDeviceId];
    if (!locations) {
      return [];
    }
    return locations.filter((loc) => loc.timeUTC >= startTime && (endTime === undefined || loc.timeUTC <= endTime));
  }

  async writeLocation(location: IDeviceLocation): Promise<void> {
    this.upsertedLocations.push(location);
  }
}
