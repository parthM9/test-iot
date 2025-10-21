export type GoogleTower = {
  readonly cellId: number;
  readonly locationAreaCode: number;
  readonly mobileCountryCode: number;
  readonly mobileNetworkCode: number;
};

export type GoogleAccessPoint = {
  macAddress: string;
  signalStrength: number;
  channel: number;
  age?: number;
  signalToNoiseRatio?: number;
};

export type GoogleGeoLocationRequest = {
  homeMobileCountryCode?: number;
  homeMobileNetworkCode?: number;
  radioType?: "lte" | "gsm";
  considerIp?: boolean;
  carrier?: string;
  cellTowers?: GoogleTower[];
  wifiAccessPoints?: GoogleAccessPoint[];
};

type Error = {
  message: string;
  domain: string;
  reason: "notFound" | "dailyLimitExceeded" | "keyInvalid" | "userRateLimitExceeded" | "parseError";
};

export type GoogleAPIError = {
  code: number;
  message: string;
  errors: Error[];
  status: string;
};

export type Location = {
  lat: number;
  lng: number;
};

export type GoogleGeoLocationResponse = {
  location?: Location;
  accuracy?: number;
  error?: GoogleAPIError;
};
