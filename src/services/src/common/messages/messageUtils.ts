import { OEMDeviceHeartbeat } from "../types/oem/OEMDeviceHeartbeat";
import crypto from "crypto";
import { fixCosmosId, convertOEMDateToISO8601 } from "../utils";
import { Record } from "../../common/types/oem/Record";
import { BaseField, Field } from "../../common/types/oem/Fields";
import { IDeviceLocation, LocationData } from "../repositories/location/types";

export function createOurMessageForLocation(
  message: OEMDeviceHeartbeat,
  locationData: LocationData,
  deviceId: string,
  record: Record,
  field?: BaseField,
): IDeviceLocation {
  const hashableMessage = field ? `${message.hashable}:${record.hashable}:${field.hashable}` : `${message.hashable}:${record.hashable}`;
  const id = crypto.createHash("sha256").update(JSON.stringify(hashableMessage)).digest("base64");
  const fixedId = fixCosmosId(id);
  return {
    id: fixedId,
    hash: "sha256",
    version: 1.0,
    deviceId: deviceId,
    externalDeviceId: `${message.serialNumber}`,
    timeUTC: convertOEMDateToISO8601(record.dateUTC),
    productId: message.productId,
    reason: record.reason,
    recordSequenceNo: record.sequenceNumber,
    location: locationData,
    internalTemperature: record.temperature,
    internalVoltage: record.internalBatteryVoltage,
    remainingBatteryPercentage: record.batteryPercentage,
  };
}
