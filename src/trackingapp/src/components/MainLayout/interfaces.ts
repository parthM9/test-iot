import { IAddress } from "../../models/cario";

export interface IConsignment {
  id: number;
  customerName: string;
  connoteNumber: string;
  pickupDate: string;
  customerReference: string;
  serviceCode: string;
  serviceName: string;
  pickupAddress: IAddress;
  deliveryAddress: IAddress;
  specialInstructions: string;
  totalItems: number;
  totalWeight: number;
  totalVolume: number;
  transportUnits: ITransportUnit[];
  status: string,
  events: any[],
  documents: any[],
  pickedUp: null,
  onBoardForDelivery: null,
  delivered: null,
  hasPOD: false,
  estimatedDelivery: null,
  isOntime: true,
  references: string[],
}

export interface IAddressLocation {
  id: number,
  locality: string,
  state: string,
  postcode: string,
  country: {
    id: number,
    isO2: string,
    isO3: string,
    name: string,
  }
}

export interface ITransportUnit {
  id: number;
  itemNo: number;
  code: string;
  description: string;
  transportUnitType: string;
  reference: string;
  quantity: number;
  length: number;
  width: number;
  height: number;
  volume: number;
  weight: number;
  shortIdentifier: string;
  barcode: string;
  packID: string;
  itemInstructions: string;
  hazardousMaterial: string;
  assets: string;
}

export interface ILatLng {
  lat: number;
  lng: number;
}