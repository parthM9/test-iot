import { ReceivedEventData } from "@azure/event-hubs";
import { IDeviceLocation } from "../repositories/location/types";
import { EdgeDeviceHeartbeat } from "./oem/EdgeDeviceHeartbeat";
import { OEMDeviceHeartbeat } from "./oem/OEMDeviceHeartbeat";

export class IOTHubDeviceMessage {
  public event: ReceivedEventData;
  public rawMessage: any;
  public payload: IDeviceMessage;

  constructor(event: ReceivedEventData) {
    if (!event.systemProperties["iothub-connection-device-id"]) {
      throw new Error(`Event has no IOT Hub device id: ${event}`);
    }

    this.event = event;
    this.rawMessage = event.body;

    const iotHubName = event.systemProperties["iothub-connection-device-id"];
    if (this.rawMessage.sqn && this.rawMessage.lat && this.rawMessage.lng) {
      this.payload = new EdgeDeviceHeartbeat(event.body, iotHubName);
    } else if (this.rawMessage.Records && this.rawMessage.SerNo) {
      this.payload = new OEMDeviceHeartbeat(event.body, iotHubName);
    } else {
      throw new Error(`Unknown message format: ${JSON.stringify(event)}`);
    }
  }
}

export interface IDeviceMessage {
  getLocations(): IDeviceLocation[];
  requiresGeoLocation(): boolean;
  get hashable(): string;
}
