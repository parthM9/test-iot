import { DocumentEntity as IDocumentEntity } from "../IRepository";

export type LocationSource = "gps" | "wifi" | "cell" | "wifi,cell";

export type SuccessfulLocationData = {
  lat: number;
  long: number;
  source: LocationSource;
  timeUTC: string;
  positionAccuracy: number; // metres
  altitude?: number; // metres
  speed?: number; // cm's/sec
  speedAccuracy?: number; // cm's/sec / 10
  heading?: number; // deg / 2
};

export type MissingLocationData = {
  error: string;
  lat?: number;
  long?: number;
  timeUTC?: string;
  positionAccuracy?: number;
};

export type LocationData = SuccessfulLocationData | MissingLocationData;

export class DeviceLocation implements IDeviceLocation {
  public id: string;
  public externalDeviceId: string; // OEM server id / serial number
  public deviceId: string;
  public timeUTC: string;
  public location: LocationData;
  public version: number;
  public hash: string;
  public productId: number;
  public reason: number;
  public recordSequenceNo: number;
  public internalTemperature?: number | undefined;
  public internalVoltage?: number | undefined;
  public remainingBatteryPercentage?: number | undefined;
}

export interface IDeviceLocation extends IDocumentEntity {
  externalDeviceId: string; // OEM server id / serial number
  deviceId: string;
  timeUTC: string;
  location: LocationData;
  version: number;
  hash: string;
  productId: number;
  reason: number;
  recordSequenceNo: number;
  internalTemperature?: number | undefined;
  internalVoltage?: number | undefined;
  remainingBatteryPercentage?: number | undefined;
}
