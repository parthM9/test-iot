import { ICarioClient } from "../CarioClient";
import { IConsignmentStatus, IConsignment, ICreateEvent } from "../generated/carioTypes";

export class FakeCarioClient implements ICarioClient {
  public consignment: IConsignment | undefined;
  public consignmentStatus: IConsignmentStatus | undefined;
  public sentEvents: ICreateEvent[] = [];

  public GetOrQueryConsignment(connoteNumberOrGuid: string): Promise<IConsignmentStatus> {
    return Promise.resolve(this.consignmentStatus);
  }

  public GetConsignmentByUID(consignmentGuid: string): Promise<IConsignment> {
    return Promise.resolve(this.consignment);
  }

  public GetConsignment(consignmentGuid: string): Promise<IConsignmentStatus> {
    return Promise.resolve(this.consignmentStatus);
  }

  public QueryConsignment(connoteId: string): Promise<IConsignmentStatus> {
    return Promise.resolve(this.consignmentStatus);
  }

  public CreateEvent(event: ICreateEvent): Promise<void> {
    this.sentEvents.push(event);
    return Promise.resolve();
  }
}
