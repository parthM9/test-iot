import { Container, CosmosClient, Database, SqlQuerySpec } from "@azure/cosmos";
import { CosmosConfig } from "../cosmos/CosmosProvider";
import { DocumentEntity, IRepository } from "./IRepository";

export class Repository<T extends DocumentEntity> implements IRepository<T> {
  private initialized: boolean = false;
  private client: CosmosClient;
  private databaseId: string;
  private containerId: string;
  private partitionKey: string;
  private database: Database | undefined;
  private container: Container | undefined;

  public constructor(config: CosmosConfig) {
    this.client = new CosmosClient(config.connectionString);
    this.databaseId = config.databaseId;
    this.containerId = config.containerId;
    this.partitionKey = config.partitionKey;
  }

  async init(): Promise<void> {
    if (!this.initialized) {
      const dbResponse = await this.client.databases.createIfNotExists({
        id: this.databaseId,
      });

      this.database = dbResponse.database;

      const containerSpec = { id: this.containerId, partitionKey: this.partitionKey };

      const response = await this.database.containers.createIfNotExists(containerSpec);

      this.container = response.container;

      this.initialized = true;
    }
  }

  async upsert(obj: T): Promise<T> {
    try {
      await this.init();

      if (obj.id === undefined) {
        throw new Error("The id of the given object is undefined: " + JSON.stringify(obj));
      }

      const options = obj._etag ? { accessCondition: { type: "IfMatch", condition: obj._etag } } : undefined;

      const { resource: item } = await this.container!.items.upsert<T>(obj, options);

      return item;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findOne(id: string): Promise<T | undefined> {
    try {
      await this.init();

      const { resource: item } = await this.container!.item(id, this.partitionKey).read<T>();

      if (!item) {
        return undefined;
      }

      return item;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findByQuery(query: SqlQuerySpec): Promise<T[]> {
    try {
      await this.init();
      const { resources: items } = await this.container!.items.query<T>(query).fetchAll();
      return items;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
