import { IGeoCalculator } from "../GeoCalculator";

export class FakeGeoCalculator implements IGeoCalculator {
  distance: number = -1;

  calculateDistance(start: { lat: number; long: number }, end: { lat: number; long: number }): number {
    return this.distance;
  }
}
