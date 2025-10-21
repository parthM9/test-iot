import { IAddress, IEvent, ITransportUnit } from "./cario";

export interface ITrackedConsignment {
  customerName?: string;
  connoteNumber: string;
  pickupDate?: Date;
  customerReference: string;
  serviceCode: string;
  serviceName: string;
  pickupAddress: IAddress;
  deliveryAddress: IAddress;
  specialInstructions?: string | undefined;
  totalItems?: number;
  totalWeight?: number;
  totalVolume?: number;
  transportUnits: ITransportUnit[];
  status: string;
  events: IEvent[];
  pickedUp?: Date | undefined;
  onBoardForDelivery?: Date | undefined;
  delivered?: Date | undefined;
  estimatedDelivery?: Date | undefined;
  deviceLocations: DeviceLocations[];
  trackingDevices: any[];
}

export type DeviceLocations = {
  deviceId: string;
  locations: GpsLocation[];
};

export type GpsLocation = {
  lat: number;
  long: number;
  timeUTC: string;
  internalTemperature?: number | null;
  internalVoltage?: number | null;
  remainingBatteryPercentage?: number | null;
};
