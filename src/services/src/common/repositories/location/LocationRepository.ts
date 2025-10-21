import { CosmosConfig } from "../../cosmos/CosmosProvider";
import { ILocationRepository } from "./ILocationRepository";
import { Repository } from "../Repository";
import { IDeviceLocation } from "./types";

export class LocationRepository implements ILocationRepository {
  private readonly repo: Repository<IDeviceLocation>;

  public constructor(cosmosConfig: CosmosConfig) {
    this.repo = new Repository<IDeviceLocation>(cosmosConfig);
  }

  async getLocationsForDevice(externalDeviceId: string, startTime: string, endTime?: string | undefined): Promise<IDeviceLocation[]> {
    const endTimeClause = endTime ? "AND (c.timeUTC <= @endTime)" : "";
    var querySpec = {
      query: `SELECT * FROM c WHERE (c.externalDeviceId = @externalDeviceId) AND (c.timeUTC >= @startTime) ${endTimeClause} ORDER BY c._ts ASC`,
      parameters: [
        { name: "@externalDeviceId", value: externalDeviceId },
        { name: "@startTime", value: startTime },
        { name: "@endTime", value: endTime || "" },
      ],
    };
    return await this.repo.findByQuery(querySpec);
  }

  async writeLocation(location: IDeviceLocation): Promise<void> {
    const parsed = {
      ...location,
      timeUTC: new Date(location.timeUTC).toISOString(),
    };
    if (parsed.location.timeUTC) {
      parsed.location.timeUTC = new Date(parsed.location.timeUTC).toISOString();
    }
    await this.repo.upsert(parsed);
  }
}
