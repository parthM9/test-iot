import { convertOEMDateToISO8601 } from "../../utils";
import { Field, Hashable } from "./Fields";
import { OEMDeviceHeartbeatType, OEMRecordType } from "./types";

export class Record extends Hashable {
  private readonly _parentPayload: OEMDeviceHeartbeatType;
  private readonly _dateUTC: string;
  readonly sequenceNumber: number;
  readonly reason: number;
  readonly fields: Field[];

  constructor(parentPayload: OEMDeviceHeartbeatType, record: OEMRecordType) {
    super([parentPayload, record]);
    this._parentPayload = parentPayload;
    this.sequenceNumber = record.SeqNo;
    this.reason = record.Reason;
    this._dateUTC = record.DateUTC;
    this.fields = record.Fields.map((field) => new Field(parentPayload, record, field));
  }

  get dateUTC(): string {
    return convertOEMDateToISO8601(this._dateUTC);
  }

  get batteryPercentage(): number | undefined {
    return this.fields.find((f) => f.isAnalogue)?.analogue.remainingBatteryPercent;
  }

  get temperature(): number | undefined {
    return this.fields.find((f) => f.isAnalogue)?.analogue.temperature;
  }

  get internalBatteryVoltage(): number | undefined {
    return this.fields.find((f) => f.isAnalogue)?.analogue.internalBatteryVoltage;
  }
}
