import { getDistance } from "geolib";

type Coordinates = {
  lat: number;
  long: number;
};

export interface IGeoCalculator {
  calculateDistance(start: Coordinates, end: Coordinates): number;
}

export class GeoCalculator implements IGeoCalculator {
  calculateDistance(start: Coordinates, end: Coordinates) {
    return getDistance({ latitude: start.lat, longitude: start.long }, { latitude: end.lat, longitude: end.long }, 1);
  }
}
