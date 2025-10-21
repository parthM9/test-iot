import { ILatLng } from "../MainLayout/interfaces";

export interface IMarker {
  position: ILatLng;
  options: google.maps.MarkerOptions;
}