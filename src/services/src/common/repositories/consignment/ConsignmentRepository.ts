import { CosmosConfig } from "../../cosmos/CosmosProvider";
import { Repository } from "../Repository";
import { IPersistedConsignment } from "./consignment";

export interface IConsignmentRepository {
  get(id: string): Promise<IPersistedConsignment | undefined>;
  getByConnote(connoteNumber: string): Promise<IPersistedConsignment | undefined>;
  upsert(consignment: IPersistedConsignment): Promise<void>;
  getConsignmentsOutForDeliveryWithDevice(deviceId: string): Promise<IPersistedConsignment[]>;
  getConsignmentsWithDeviceAfter(connote: string, deviceId: string, startTime: string): Promise<IPersistedConsignment[]>;
}

export class ConsignmentRepository implements IConsignmentRepository {
  private readonly repo: Repository<IPersistedConsignment>;

  public constructor(cosmosConfig: CosmosConfig) {
    this.repo = new Repository<IPersistedConsignment>(cosmosConfig);
  }

  async get(id: string): Promise<IPersistedConsignment | undefined> {
    var querySpec = {
      query: "SELECT * FROM c WHERE c.id = @id",
      parameters: [{ name: "@id", value: id }],
    };
    const results = await this.repo.findByQuery(querySpec);

    if (!results) {
      return undefined;
    }

    return results[0];
  }

  async getByConnote(connoteNumber: string): Promise<IPersistedConsignment | undefined> {
    var querySpec = {
      query: "SELECT * FROM c WHERE (c.connoteNumber = @connoteNumber) ORDER BY c._ts DESC OFFSET 0 LIMIT 1",
      parameters: [{ name: "@connoteNumber", value: connoteNumber }],
    };

    const results = await this.repo.findByQuery(querySpec);

    if (!results) {
      return undefined;
    }

    return results[0];
  }

  async upsert(consignment: IPersistedConsignment): Promise<void> {
    await this.repo.upsert(consignment);
  }

  async getConsignmentsOutForDeliveryWithDevice(deviceId: string): Promise<IPersistedConsignment[]> {
    // var querySpec = {
    //   query: `SELECT * FROM c
    //     WHERE c.currentStatus = "OBFD"
    //     AND ARRAY_CONTAINS(c.devices, {"serialNumber": @deviceId}, true)
    //     ORDER BY c.currentStatusTime DESC`,
    //   parameters: [{ name: "@deviceId", value: deviceId }],
    // };

    var querySpec = {
      query: `SELECT * FROM c 
        WHERE c.currentStatus != "DEL" 
        AND NOT IS_DEFINED(c.alertStatus)
        AND ARRAY_CONTAINS(c.devices, {"serialNumber": @deviceId}, true)
        ORDER BY c.currentStatusTime DESC`,
      parameters: [{ name: "@deviceId", value: deviceId }],
    };

    const results = await this.repo.findByQuery(querySpec);

    if (!results) {
      return [];
    }

    return results;
  }

  async getConsignmentsWithDeviceAfter(connote: string, deviceId: string, startTime: string): Promise<IPersistedConsignment[]> {
    var querySpec = {
      query: `SELECT * FROM c
        WHERE c.createTime >= @startTime
        AND c.connoteNumber != @connote
        AND ARRAY_CONTAINS(c.devices, {"serialNumber": @deviceId}, true)
        ORDER BY c.createTime ASC
        OFFSET 0 LIMIT 1`,
      parameters: [
        { name: "@connote", value: connote },
        { name: "@deviceId", value: deviceId },
        { name: "@startTime", value: startTime },
      ],
    };

    const results = await this.repo.findByQuery(querySpec);

    if (!results) {
      return [];
    }

    return results;
  }
}
