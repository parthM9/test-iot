export type BaseFieldType = {
  FType: number;
};

export type GPSFieldType = {
  GpsUTC: string;
  Lat: number;
  Long: number;
  Alt: number;
  Spd: number;
  SpdAcc: number;
  Head: number;
  PDOP: number;
  PosAcc: number;
  GpsStat: number;
} & BaseFieldType;

export type AnalogueFieldType = {
  AnalogueData: {
    "1": number;
    "2"?: number;
    "3": number;
    "4": number;
    "5": number;
    "6": number;
  };
} & BaseFieldType;

export type AccessPointType = {
  MAC: string;
  Sig: number;
  Ch: number;
};

export type TowerType = {
  CID: number;
  LAC: number;
  MCC: number;
  MNC: number;
};

export type AccessPointsFieldType = {
  APs: AccessPointType[];
} & BaseFieldType;

export type TowersFieldType = {
  Towers: TowerType[];
  FType: number;
};

export type DigitalDataFieldType = {
  DIn: number;
  DOut: number;
  DevStat: number;
} & BaseFieldType;

export type OEMFieldType = GPSFieldType | DigitalDataFieldType | AnalogueFieldType | AccessPointsFieldType | TowersFieldType;

export type OEMRecordType = {
  SeqNo: number;
  Reason: number;
  DateUTC: string;
  Fields: OEMFieldType[];
};

export type OEMDeviceHeartbeatType = {
  SerNo: number;
  IMEI: string;
  ICCID: string;
  ProdId: number;
  FW: string;
  Records: OEMRecordType[];
};
