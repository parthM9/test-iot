import { OEMDeviceHeartbeatType } from "./types";
import { Record } from "./Record";
import { BaseField, Hashable } from "./Fields";
import { IDeviceLocation, LocationData } from "../../repositories/location/types";
import { convertOEMDateToISO8601, fixCosmosId } from "../../utils";
import { IDeviceMessage } from "../IOTHubDeviceMessage";

export class OEMDeviceHeartbeat extends Hashable implements IDeviceMessage {
  public serialNumber: number;
  public IMEI: string;
  public ICCID: string;
  public productId: number;
  public FW: string;
  public records: Record[];
  public iotHubDeviceId: string;

  constructor(payload: OEMDeviceHeartbeatType, iotHubDeviceId: string) {
    super([payload]);
    this.iotHubDeviceId = iotHubDeviceId;
    this.serialNumber = payload.SerNo;
    this.IMEI = payload.IMEI;
    this.ICCID = payload.ICCID;
    this.productId = payload.ProdId;
    this.FW = payload.FW;
    this.records = payload.Records?.map((r) => new Record(payload, r)) || [];
  }

  requiresGeoLocation(): boolean {
    const geoLocationFields = this.records.flatMap((r) => r.fields).filter((f) => f.isAccessPoints || f.isTowers);
    return geoLocationFields.length > 0;
  }

  getLocations() {
    const messages: IDeviceLocation[] = [];

    if (this.records) {
      this.records.forEach((record) => {
        const gpsFields = record.fields.filter((field) => field.isGps).map((f) => f.gps);
        gpsFields.forEach((field) => {
          // Hash the msg/record/field
          const locationData: LocationData = {
            lat: field.lat,
            long: field.long,
            source: "gps",
            positionAccuracy: field.positionAccuracy,
            speed: field.speed,
            speedAccuracy: field.speedAccuracy,
            heading: field.heading,
            timeUTC: field.gpsUTC,
          };

          const msg = this.createOurMessageForLocation(locationData, this.iotHubDeviceId, record, field);

          if (!msg.internalTemperature) {
            console.log("Message has no voltage", msg);
          }

          messages.push(msg);
        });
      });
    } else {
      console.log("Bad message received", this.parts[0]);
    }

    return messages;
  }

  private createOurMessageForLocation(locationData: LocationData, deviceId: string, record: Record, field?: BaseField): IDeviceLocation {
    const id = this.hashable;
    const fixedId = fixCosmosId(id);
    return {
      id: fixedId,
      hash: "sha256",
      version: 1.0,
      deviceId: deviceId,
      externalDeviceId: `${this.serialNumber}`,
      timeUTC: convertOEMDateToISO8601(record.dateUTC),
      productId: this.productId,
      reason: record.reason,
      recordSequenceNo: record.sequenceNumber,
      location: locationData,
      internalTemperature: record.temperature,
      internalVoltage: record.internalBatteryVoltage,
      remainingBatteryPercentage: record.batteryPercentage,
    };
  }
}
