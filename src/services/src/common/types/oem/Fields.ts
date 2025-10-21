import {
  AccessPointsFieldType,
  AccessPointType,
  AnalogueFieldType,
  BaseFieldType,
  GPSFieldType,
  OEMDeviceHeartbeatType,
  OEMFieldType,
  OEMRecordType,
  TowersFieldType,
  TowerType,
} from "./types";
import crypto from "crypto";
import { convertOEMDateToISO8601 } from "../../utils";
import { GoogleAccessPoint, GoogleTower } from "../../geolocate/types";

export const GPSFieldId = 0;
export const AnalogueFieldId = 6;
export const AccessPointsFieldId = 25;
export const TowersFieldId = 28;

export abstract class Hashable {
  protected parts: any[];

  constructor(parts: any[]) {
    this.parts = parts;
  }

  get hashable(): string {
    const hashableString = this.parts.map((p) => JSON.stringify(p)).join(":");
    return crypto.createHash("sha256").update(JSON.stringify(hashableString)).digest("base64");
  }
}

export abstract class BaseField extends Hashable {
  public fieldType: number;

  constructor(parentPaylod: OEMDeviceHeartbeatType, parentRecord: OEMRecordType, field: BaseFieldType) {
    super([parentPaylod, parentRecord, field]);
    this.fieldType = field.FType;
  }
}

export class Field extends BaseField {
  private readonly _parentRecordField: OEMRecordType;
  private readonly _rawField: OEMFieldType;
  public readonly gps: GPSField | undefined;
  public readonly accessPoints: AccessPointsField | undefined;
  public readonly towersField: TowersField | undefined;
  public readonly analogue: AnalogueField | undefined;

  constructor(parentPayload: OEMDeviceHeartbeatType, parentRecord: OEMRecordType, field: OEMFieldType) {
    super(parentPayload, parentRecord, field);
    this._parentRecordField = parentRecord;
    this._rawField = field;

    switch (field.FType) {
      case GPSFieldId:
        this.gps = new GPSField(parentPayload, parentRecord, field as GPSFieldType);
        break;
      case AccessPointsFieldId:
        this.accessPoints = new AccessPointsField(field as AccessPointsFieldType);
        break;
      case TowersFieldId:
        this.towersField = new TowersField(field as TowersFieldType);
        break;
      case AnalogueFieldId:
        this.analogue = new AnalogueField(field as AnalogueFieldType);
        break;
    }
  }

  get isGps(): boolean {
    return this.fieldType === GPSFieldId;
  }

  get isAccessPoints(): boolean {
    return this.fieldType === AccessPointsFieldId;
  }

  get isTowers(): boolean {
    return this.fieldType === TowersFieldId;
  }

  get isAnalogue(): boolean {
    return this.fieldType === AnalogueFieldId;
  }
}

export class GPSField extends BaseField {
  private readonly _gpsUTC: string;
  readonly gpsStat: number;
  readonly lat: number;
  readonly long: number;
  readonly altitude: number;
  readonly speed: number;
  readonly speedAccuracy: number;
  readonly heading: number;
  readonly PDOP: number;
  readonly positionAccuracy: number;

  constructor(parentPaylod: OEMDeviceHeartbeatType, parentRecord: OEMRecordType, field: GPSFieldType) {
    super(parentPaylod, parentRecord, field);
    this._gpsUTC = field.GpsUTC;
    this.gpsStat = field.GpsStat;
    this.lat = field.Lat;
    this.long = field.Long;
    this.altitude = field.Alt;
    this.speed = field.Spd;
    this.speedAccuracy = field.SpdAcc;
    this.heading = field.Head;
    this.PDOP = field.PDOP;
    this.positionAccuracy = field.PosAcc;
  }

  get gpsUTC(): string {
    return convertOEMDateToISO8601(this._gpsUTC);
  }
}

class AccessPoint {
  readonly mac: string;
  readonly signalStrength: number;
  readonly channel: number;

  constructor(field: AccessPointType) {
    this.mac = field.MAC;
    this.signalStrength = field.Sig;
    this.channel = field.Ch;
  }

  toGoogleFormat(): GoogleAccessPoint {
    return {
      macAddress: this.mac,
      signalStrength: this.signalStrength,
      channel: this.channel,
      signalToNoiseRatio: 0,
      age: 0,
    };
  }
}

export class AccessPointsField {
  readonly accessPoints: AccessPoint[];
  readonly fieldType: number;

  constructor(field: AccessPointsFieldType) {
    this.fieldType = field.FType;
    this.accessPoints = field.APs.map((ap) => new AccessPoint(ap));
  }
}

class Tower {
  readonly cellId: number;
  readonly locationAreaCode: number;
  readonly mobileCountryCode: number;
  readonly mobileNetworkCode: number;

  constructor(tower: TowerType) {
    this.cellId = tower.CID;
    this.locationAreaCode = tower.LAC;
    this.mobileCountryCode = tower.MCC;
    this.mobileNetworkCode = tower.MNC;
  }

  toGoogleFormat(): GoogleTower {
    return {
      cellId: this.cellId,
      locationAreaCode: this.locationAreaCode,
      mobileCountryCode: this.mobileCountryCode,
      mobileNetworkCode: this.mobileNetworkCode,
    };
  }
}

export class TowersField {
  readonly towers: Tower[];
  readonly fieldType: number;

  constructor(field: TowersFieldType) {
    this.fieldType = field.FType;
    this.towers = field.Towers.map((t) => new Tower(t));
  }
}

export class AnalogueField {
  readonly fieldType: number;
  readonly _internalBatteryVoltage: number; // mV
  readonly _externalBatteryVoltage: number; // v*100
  readonly _temperature: number; // C
  readonly _remainingBatteryPercent: number; // %

  constructor(field: AnalogueFieldType) {
    this.fieldType = field.FType;
    this._internalBatteryVoltage = field.AnalogueData[1];
    this._externalBatteryVoltage = field.AnalogueData[2];
    this._temperature = field.AnalogueData[3];
    this._remainingBatteryPercent = field.AnalogueData[6];
  }

  get internalBatteryVoltage() {
    return this._internalBatteryVoltage / 1000;
  }

  get externalBatteryVoltage() {
    if (isNaN(this._externalBatteryVoltage) || this._externalBatteryVoltage === undefined) {
      return undefined;
    }
    return this._externalBatteryVoltage / 100;
  }

  get temperature() {
    return this._temperature / 100;
  }

  get remainingBatteryPercent() {
    return this._remainingBatteryPercent / 100;
  }
}
