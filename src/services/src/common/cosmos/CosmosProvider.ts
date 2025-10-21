import { Container, CosmosClient, Database } from "@azure/cosmos";
import { DeleteReference, ICosmosProvider } from "./ICosmosProvider";

export type CosmosConfig = {
  connectionString: string;
  databaseId: string;
  containerId: string;
  partitionKey: string;
};

export class CosmosProvider implements ICosmosProvider {
  private client: CosmosClient;
  private databaseId: string;
  private containerId: string;
  private partitionKey: string;
  private database: Database | undefined;
  private container: Container | undefined;

  public static async Create(config: CosmosConfig): Promise<CosmosProvider> {
    const provider = new CosmosProvider(config.connectionString, config.databaseId, config.containerId, config.partitionKey);
    await provider.init();
    return provider;
  }

  private constructor(connectionString: string, databaseId: string, containerId: string, partitionKey: string) {
    this.client = new CosmosClient(connectionString);
    this.databaseId = databaseId;
    this.containerId = containerId;
    this.partitionKey = partitionKey;
  }

  async init(): Promise<void> {
    const dbResponse = await this.client.databases.createIfNotExists({
      id: this.databaseId,
    });

    this.database = dbResponse.database;

    const containerSpec = { id: this.containerId, partitionKey: this.partitionKey };

    const response = await this.database.containers.createIfNotExists(containerSpec);

    this.container = response.container;
  }

  async writeEvent(event: any): Promise<void> {
    if (!this.container && !this.database) {
      throw new Error("Cosmos container is not initialized");
    }
    await this.container?.items.upsert(event);
  }

  async items(): Promise<any[]> {
    if (!this.container && !this.database) {
      throw new Error("Cosmos container is not initialized");
    }

    const querySpec = {
      query: "SELECT * from c",
    };

    const { resources: items } = await this.container.items.query(querySpec).fetchAll();

    return items;
  }

  async get(id: string) {
    if (!this.container && !this.database) {
      throw new Error("Cosmos container is not initialized");
    }

    const { resource: item } = await this.container.item(id, this.partitionKey).read();

    return item;
  }

  async delete(ids: DeleteReference[]): Promise<void> {
    if (!this.container && !this.database) {
      throw new Error("Cosmos container is not initialized");
    }

    for (let i = 0; i < ids.length; i++) {
      await this.container.item(ids[i].id, ids[i].partitionKey).delete();
    }
  }
}
