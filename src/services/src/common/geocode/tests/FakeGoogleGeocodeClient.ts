import { IGeocodeClient } from "../GoogleGeocodeClient";
import { GoogleGeocodeResponse } from "../types";

export class FakeGoogleGeocodeClient implements IGeocodeClient {
  public response: GoogleGeocodeResponse;
  geocode(address: string): Promise<GoogleGeocodeResponse> {
    return Promise.resolve(this.response);
  }

  addFakeResponse() {
    this.response = {
      status: "OK",
      results: [
        {
          geometry: {
            location: {
              lat: 1,
              lng: 2,
            },
          },
        },
      ],
    };
  }
}
