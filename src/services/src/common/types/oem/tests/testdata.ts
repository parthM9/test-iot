import { IEdgeDeviceHeartbeat } from "../EdgeHeartbeatTypes";
import { OEMDeviceHeartbeatType } from "../types";

export const oemHeartbeatPayload: OEMDeviceHeartbeatType = {
  SerNo: 206169,
  IMEI: "356726100970870",
  ICCID: "89610185002364857485",
  ProdId: 74,
  FW: "74.2.2.4",
  Records: [
    {
      SeqNo: 288,
      Reason: 11,
      DateUTC: "2019-11-14 17:23:02",
      Fields: [
        {
          GpsUTC: "2019-11-11 17:17:16",
          Lat: -38.1967688,
          Long: 145.0866086,
          Alt: 90,
          Spd: 2,
          SpdAcc: 12,
          Head: 4,
          PDOP: 19,
          PosAcc: 40,
          GpsStat: 7,
          FType: 0,
        },
        {
          DIn: 1,
          DOut: 3,
          DevStat: 2,
          FType: 2,
        },
        {
          AnalogueData: {
            "1": 4631,
            "3": 1895,
            "4": 99,
            "5": 4503,
            "6": 9787,
          },
          FType: 6,
        },
        {
          APs: [
            {
              MAC: "74:83:C2:B7:D0:ED",
              Sig: -32,
              Ch: 11,
            },
            {
              MAC: "00:1D:AA:7A:C9:40",
              Sig: -40,
              Ch: 8,
            },
          ],
          FType: 25,
        },
        {
          Towers: [
            {
              CID: 137561869,
              LAC: 12384,
              MCC: 505,
              MNC: 1,
            },
          ],
          FType: 28,
        },
      ],
    },
  ],
};

export const edgeHeartbeatPayload: IEdgeDeviceHeartbeat = {
  date: "2021-11-06T09:16:49Z",
  device: {
    sn: "416197",
    prod: 85,
    rev: 1,
    fw: "1.12",
    iccid: "89610185002695999930",
    imei: "351358810433059",
  },
  sqn: 1462,
  reason: 11,
  lat: -37.9816911,
  lng: 145.0222181,
  posAcc: 16,
  posInfo: {
    Src: 6,
  },
  analogues: [
    {
      id: 1,
      val: 5281,
    },
    {
      id: 3,
      val: 2000,
    },
    {
      id: 4,
      val: 8,
    },
    {
      id: 5,
      val: 5281,
    },
  ],
  inputs: 2,
  outputs: 0,
  status: 2,
};
