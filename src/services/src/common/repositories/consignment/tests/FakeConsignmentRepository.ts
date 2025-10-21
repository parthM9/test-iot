import { sortByTime } from "../../../tracking/TrackingClient";
import { IPersistedConsignment } from "../consignment";
import { IConsignmentRepository } from "../ConsignmentRepository";

export class FakeConsignmentRepository implements IConsignmentRepository {
  public upsertedConsignment: IPersistedConsignment | undefined;
  public consignment: IPersistedConsignment | undefined;
  public consignmentsOutForDelivery: IPersistedConsignment[] = [];
  public consignmentsWithDeviceAfter: IPersistedConsignment[] = [];

  get(id: string): Promise<IPersistedConsignment | undefined> {
    return Promise.resolve(this.consignment);
  }

  getByConnote(connoteNumber: string): Promise<IPersistedConsignment | undefined> {
    return Promise.resolve(this.consignment);
  }

  upsert(consignment: IPersistedConsignment): Promise<void> {
    this.upsertedConsignment = consignment;
    return Promise.resolve();
  }

  getConsignmentsOutForDeliveryWithDevice(deviceId: string): Promise<IPersistedConsignment[]> {
    return Promise.resolve(this.consignmentsOutForDelivery);
  }

  getConsignmentsWithDeviceAfter(connote: string, deviceId: string, startTime: string): Promise<IPersistedConsignment[]> {
    return Promise.resolve(
      this.consignmentsWithDeviceAfter
        .filter((c) => c.createTime >= startTime)
        .filter((c) => c.connoteNumber !== connote)
        .sort((a, b) => sortByTime(a.createTime, b.createTime, true)),
    );
  }
}
