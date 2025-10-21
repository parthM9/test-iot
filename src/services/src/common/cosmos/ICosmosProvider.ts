export type DeleteReference = {
  id: string;
  partitionKey: string;
};

export interface ICosmosProvider {
  init(): Promise<void>;
  writeEvent(event: any): Promise<void>;
  items(): Promise<any[]>;
  get(id: string): Promise<any>;
  delete(ids: DeleteReference[]): Promise<void>;
}
