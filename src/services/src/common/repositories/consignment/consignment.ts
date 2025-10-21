import { DocumentEntity as IDocumentEntity } from "../IRepository";
import { IConsignment } from "../../cario/generated/carioTypes";

/**
 *
 * Events are raised based on the consignment status changed. This includes system statuses:
 *
 * Created
 * Manifested
 *
 * and milestone statuses:
 *
 * PICKUP
 * TRANSIT
 * OBFD
 * DEL
 *
 */

// Cario -> FP IoT API Callback
export type CarioCallback = {
  Id: string; // guid
  ConnoteNumber: string;
  StatusChanged: string; // date time
  CurrentStatus: string;
  PreviousStatus: string;
};

export class PersistedConsignment implements IPersistedConsignment {
  static fromCallBack(payload: CarioCallback, carioConsignment: IConsignment) {
    return {
      id: payload.Id, // guid
      carioId: carioConsignment.id,
      connoteNumber: carioConsignment.connoteNumber,
      createTime: new Date(payload.StatusChanged).toISOString(),
      currentStatus: parseStatusEvent(payload.CurrentStatus),
      currentStatusTime: new Date(payload.StatusChanged).toISOString(),
      lastConsignment: carioConsignment,
      devices: [],
      callbackHistory: [],
      consignmentHistory: [],
    };
  }

  public id: string;
  public carioId: number;
  public connoteNumber: string;
  public lastConsignment: IConsignment;
  public devices: ConsignmentDevice[];
  public callbackHistory: CarioCallback[];
  public consignmentHistory: IConsignment[];
  public deliveryCoordinates?: DeliveryCoordinates;

  public createTime: string;
  public deliveredTime?: string | undefined;

  public currentStatus: ConsignmentStatusEvent;
  public currentStatusTime: string;
  public previousStatus?: ConsignmentStatusEvent | undefined;
  public previousStatusTime?: string | undefined;
}

export interface IPersistedConsignment extends IDocumentEntity {
  carioId: number;
  connoteNumber: string;
  lastConsignment: IConsignment;
  devices: ConsignmentDevice[];
  callbackHistory: CarioCallback[];
  consignmentHistory: IConsignment[];
  deliveryCoordinates?: DeliveryCoordinates;

  createTime: string;
  deliveredTime?: string | undefined;

  currentStatus: ConsignmentStatusEvent;
  currentStatusTime: string;
  previousStatus?: ConsignmentStatusEvent | undefined;
  previousStatusTime?: string | undefined;
  alertStatus?: AlertStatus | undefined;

  _etag?: string;
}

export interface AlertStatus {
  alertSentAt: string; // time the alert was sent
  distanceToDestination: number; // distance to destination in metres
}

export const TRACKER_ASSET_CLASS = "TrackerAssets";

export type ConsignmentDevice = {
  serialNumber: string;
  deviceName: string;
  transportUnitId: number;
};

export type DeliveryCoordinates = {
  lat: number;
  long: number;
};

export enum ConsignmentStatusEvent {
  Created = "Created",
  Manifested = "Manifested",
  PICKUP = "PICKUP",
  TRANSIT = "TRANSIT",
  OBFD = "OBFD",
  DEL = "DEL",
}

export function parseStatusEvent(status: string): ConsignmentStatusEvent {
  return ConsignmentStatusEvent[status as keyof ConsignmentStatusEvent];
}
