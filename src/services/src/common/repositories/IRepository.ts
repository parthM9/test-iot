import { ItemDefinition, SqlQuerySpec } from "@azure/cosmos";

export interface DocumentEntity extends ItemDefinition {
  _etag?: string;
}

export interface IRepository<T extends DocumentEntity> {
  upsert(obj: T): Promise<T>;
  findOne(id: string): Promise<T | undefined>;
  findByQuery(query: SqlQuerySpec): Promise<T[]>;
}
