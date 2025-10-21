import { Hashable } from "./Fields";
import { IDeviceLocation } from "../../repositories/location/types";
import { fixCosmosId } from "../../utils";
import { IEdgeDeviceHeartbeat } from "./EdgeHeartbeatTypes";
import { IDeviceMessage } from "../IOTHubDeviceMessage";

export class EdgeDeviceHeartbeat extends Hashable implements IDeviceMessage {
  public iotHubDeviceId: string;

  private payload: IEdgeDeviceHeartbeat;

  constructor(payload: IEdgeDeviceHeartbeat, iotHubDeviceId: string) {
    super([payload]);
    this.payload = payload;
    this.iotHubDeviceId = iotHubDeviceId;
  }

  requiresGeoLocation(): boolean {
    return false;
  }

  getLocations(): IDeviceLocation[] {
    return [this.createDeviceLocation()];
  }

  private createDeviceLocation(): IDeviceLocation {
    const fixedId = fixCosmosId(this.hashable);
    return {
      id: fixedId,
      hash: "sha256",
      version: 1.0,
      deviceId: this.iotHubDeviceId,
      externalDeviceId: `${this.payload.device.sn}`,
      timeUTC: this.payload.date,
      productId: this.payload.device.prod,
      reason: this.payload.reason,
      recordSequenceNo: this.payload.sqn,
      location: {
        lat: this.payload.lat,
        long: this.payload.lng,
        source: "gps",
        timeUTC: this.payload.date,
        positionAccuracy: this.payload.posAcc,
      },
      internalTemperature: this.internalTemperature(),
      internalVoltage: this.internalBatteryVoltage(),
      remainingBatteryPercentage: this.remainingBatteryPercentage(),
    };
  }

  private internalTemperature() {
    const analoqueValue = this.payload.analogues.find((a) => a.id === 3)?.val;
    return analoqueValue ? analoqueValue / 100 : -1;
  }

  private internalBatteryVoltage() {
    const analoqueValue = this.payload.analogues.find((a) => a.id === 1)?.val;
    return analoqueValue ? analoqueValue / 1000 : -1;
  }

  private externalBatteryVoltage() {
    const analoqueValue = this.payload.analogues.find((a) => a.id === 2)?.val;
    return analoqueValue ? analoqueValue / 100 : undefined;
  }

  private remainingBatteryPercentage() {
    const analoqueValue = this.payload.analogues.find((a) => a.id === 6)?.val;
    return analoqueValue ? analoqueValue / 100 : -1;
  }
}
