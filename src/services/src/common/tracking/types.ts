import { IAddress, IConsignmentStatus, IEvent, ITransportUnit } from "../cario/generated/carioTypes";
import { ConsignmentDevice, IPersistedConsignment } from "../repositories/consignment/consignment";

export interface ITrackedConsignment {
  connoteNumber: string;
  pickupDate?: Date;
  customerName?: string;
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
}

export type DeviceLocations = {
  deviceId: string;
  locations: GpsLocation[];
};

export type GpsLocation = {
  lat: number;
  long: number;
  timeUTC: string;
  internalTemperature: number | null;
  internalVoltage: number | null;
  remainingBatteryPercentage: number | null;
};

export class TrackedConsignment implements ITrackedConsignment {
  connoteNumber: string;
  pickupDate?: Date;
  customerName?: string;
  customerReference: string;
  serviceCode: string;
  serviceName: string;
  pickupAddress: IAddress;
  deliveryAddress: IAddress;
  specialInstructions?: string;
  totalItems?: number;
  totalWeight?: number;
  totalVolume?: number;
  transportUnits: ITransportUnit[];
  status: string;
  events: IEvent[];
  pickedUp?: Date;
  onBoardForDelivery?: Date;
  delivered?: Date;
  estimatedDelivery?: Date;
  trackingDevices: ConsignmentDevice[];
  deviceLocations: DeviceLocations[];

  constructor(
    consignmentStatus: IConsignmentStatus,
    deviceLocations: DeviceLocations[],
    private readonly obfuscateDetails: boolean,
    ourConsignment?: IPersistedConsignment | undefined,
  ) {
    this.connoteNumber = consignmentStatus.connoteNumber!;
    this.customerName = consignmentStatus.customerName;
    this.pickedUp = consignmentStatus.pickupDate;
    this.pickupAddress = consignmentStatus.pickupAddress!;
    this.customerReference = consignmentStatus.customerReference!;
    this.serviceCode = consignmentStatus.serviceCode!;
    this.serviceName = consignmentStatus.serviceName;
    this.deliveryAddress = consignmentStatus.deliveryAddress!;
    this.specialInstructions = consignmentStatus.specialInstructions;
    this.totalItems = consignmentStatus.totalItems;
    this.totalWeight = consignmentStatus.totalWeight;
    this.totalVolume = consignmentStatus.totalVolume;
    this.transportUnits = consignmentStatus.transportUnits || [];
    this.events = this.filterMilestoneEvents(consignmentStatus.events || []);
    this.pickedUp = consignmentStatus.pickedUp;
    this.onBoardForDelivery = consignmentStatus.onBoardForDelivery;
    this.delivered = consignmentStatus.delivered;
    this.estimatedDelivery = consignmentStatus.estimatedDelivery;
    this.trackingDevices = ourConsignment?.devices || [];
    this.deviceLocations = deviceLocations;
    this.status = this.getStatusFromMilestones(consignmentStatus, this.events);

    if (this.obfuscateDetails) {
      this.customerName = undefined;

      this.deliveryAddress.name = undefined;
      this.deliveryAddress.line1 = undefined;
      this.deliveryAddress.line2 = undefined;
      this.deliveryAddress.line3 = undefined;
      this.deliveryAddress.contact = undefined;

      this.pickupAddress.name = undefined;
      this.pickupAddress.line1 = undefined;
      this.pickupAddress.line2 = undefined;
      this.pickupAddress.line3 = undefined;
      this.pickupAddress.contact = undefined;
    }
  }

  private filterMilestoneEvents(events: IEvent[]): IEvent[] {
    const filteredEvents: IEvent[] = [];
    filteredEvents.push(events.find((event) => event.milestone === "Manifested" || (event as any).title === "Manifested"));
    filteredEvents.push(events.find((event) => event.milestone === "In Transit" && (event as any).title !== "Manifested"));
    filteredEvents.push(events.find((event) => event.milestone === "On Board for Delivery"));
    filteredEvents.push(events.find((event) => event.milestone === "Delivered"));
    return filteredEvents.filter((e) => e !== undefined);
  }

  private getStatusFromMilestones(consignmentStatus: IConsignmentStatus, events: IEvent[]) {
    if (!events || events.length === 0) {
      return consignmentStatus.status;
    }
    return events[events.length - 1].milestone;
  }
}
