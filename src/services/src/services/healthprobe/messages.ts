import moment from "moment";

const OEM_FORMAT = "YYYY-MM-DD HH:mm:ss";

type Coords = {
  lat: number;
  long: number;
};

export function getOEMGpsMessage(deviceSerialNumber: number, coords: Coords) {
  const time = moment.utc().format(OEM_FORMAT);
  return {
    SerNo: deviceSerialNumber,
    IMEI: "356726108891557",
    ICCID: "89610185002364857552",
    ProdId: 77,
    FW: "77.2.2.5",
    Records: [
      {
        SeqNo: 1131,
        Reason: 11,
        DateUTC: time,
        Fields: [
          {
            GpsUTC: time,
            Lat: coords.lat,
            Long: coords.long,
            Alt: 96,
            Spd: 0,
            SpdAcc: 12,
            Head: 0,
            PDOP: 20,
            PosAcc: 42,
            GpsStat: 7,
            FType: 0,
          },
          {
            DIn: 2,
            DOut: 0,
            DevStat: 2,
            FType: 2,
          },
          {
            AnalogueData: {
              "1": 3983,
              "3": 1698,
              "4": 99,
              "5": 3921,
              "6": 9975,
            },
            FType: 6,
          },
        ],
      },
    ],
  };
}

export function getOEMWifiMessage(deviceSerialNumber: number) {
  const time = moment.utc().format(OEM_FORMAT);
  return {
    SerNo: deviceSerialNumber,
    IMEI: "352753092930476",
    ICCID: "89610185002543609307",
    ProdId: 72,
    FW: "72.2.2.2",
    Records: [
      {
        SeqNo: 4692,
        Reason: 11,
        DateUTC: time,
        Fields: [
          {
            APs: [
              {
                MAC: "74:83:C2:B7:D0:ED",
                Sig: -36,
                Ch: 11,
              },
              {
                MAC: "00:1D:AA:7A:C9:40",
                Sig: -49,
                Ch: 8,
              },
              {
                MAC: "18:F1:45:AE:E6:63",
                Sig: -65,
                Ch: 6,
              },
              {
                MAC: "34:FC:B9:9F:1B:80",
                Sig: -81,
                Ch: 11,
              },
              {
                MAC: "34:FC:B9:9F:1B:81",
                Sig: -83,
                Ch: 11,
              },
              {
                MAC: "34:FC:B9:50:02:E0",
                Sig: -86,
                Ch: 6,
              },
              {
                MAC: "18:E8:29:57:FA:5D",
                Sig: -87,
                Ch: 11,
              },
              {
                MAC: "08:36:C9:2C:66:40",
                Sig: -90,
                Ch: 1,
              },
            ],
            FType: 25,
          },
          {
            Towers: [
              {
                CID: 137132043,
                LAC: 12384,
                MCC: 505,
                MNC: 1,
              },
            ],
            FType: 28,
          },
          {
            DIn: 5,
            DOut: 0,
            DevStat: 3,
            FType: 2,
          },
          {
            AnalogueData: {
              "1": 5344,
              "3": 1232,
              "4": 99,
              "5": 5254,
            },
            FType: 6,
          },
        ],
      },
    ],
  };
}

export function getEdgeGpsMessage(deviceSerialNumber: number, coords: Coords) {
  const time = moment.utc().format(OEM_FORMAT);
  return {
    date: time,
    device: {
      sn: `${deviceSerialNumber}`,
      prod: 85,
      rev: 1,
      fw: "1.12",
      iccid: "89610185002695999930",
      imei: "351358810433059",
    },
    sqn: 1462,
    reason: 11,
    lat: coords.lat,
    lng: coords.long,
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
}
