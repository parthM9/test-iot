import axios from "axios";
import { GoogleGeoLocationRequest, GoogleGeoLocationResponse } from "./types";

export class GoogleGeoLocation {
  constructor(private apiKey: string) {}

  async geolocate(request: GoogleGeoLocationRequest): Promise<GoogleGeoLocationResponse> {
    try {
      const { data } = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${this.apiKey}`, request, {
        validateStatus: (status) => {
          return status >= 500;
        },
      });
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
}
