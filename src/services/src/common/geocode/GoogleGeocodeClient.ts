import TelemetryClient from "applicationinsights/out/Library/TelemetryClient";
import axios from "axios";
import { GoogleGeocodeResponse } from "./types";

export interface IGeocodeClient {
  geocode(address: string): Promise<GoogleGeocodeResponse>;
}

export class GoogleGeocodeClient implements IGeocodeClient {
  constructor(private readonly apiKey: string, private readonly logger: TelemetryClient) {}

  async geocode(address: string): Promise<GoogleGeocodeResponse> {
    try {
      const encoded = encodeURIComponent(address);
      const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${this.apiKey}`);
      console.log("Geocode Response", data);
      if (data.status !== "OK") {
        this.logger.trackException({ exception: new Error(`Failed to geocode ${address} (encoded: ${encoded})`) });
      }
      return data;
    } catch (error) {
      console.log("Geocode Error Response", error.response.data);
      return error.response.data;
    }
  }
}
