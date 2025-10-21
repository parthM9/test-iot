import { GoogleTower } from "../../geolocate/types";
import { TowersFieldType, TowerType } from "./types";

class Tower {
  readonly cellId: number;
  readonly locationAreaCode: number;
  readonly mobileCountryCode: number;
  readonly mobileNetworkCode: number;

  constructor(tower: TowerType) {
    this.cellId = tower.CID;
    this.locationAreaCode = tower.LAC;
    this.mobileCountryCode = tower.MCC;
    this.mobileNetworkCode = tower.MNC;
  }

  toGoogleFormat(): GoogleTower {
    return {
      cellId: this.cellId,
      locationAreaCode: this.locationAreaCode,
      mobileCountryCode: this.mobileCountryCode,
      mobileNetworkCode: this.mobileNetworkCode,
    };
  }
}

export class TowersField {
  readonly towers: Tower[];
  readonly fieldType: number;

  constructor(field: TowersFieldType) {
    this.fieldType = field.FType;
    this.towers = field.Towers.map((t) => new Tower(t));
  }
}
