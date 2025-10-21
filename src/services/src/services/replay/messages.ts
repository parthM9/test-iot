import moment from "moment";

const OEM_FORMAT = "YYYY-MM-DD HH:mm:ss";

type Coords = {
  lat: number;
  long: number;
};

export function getGpsMessage(deviceSerialNumber: number, coords: Coords) {
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

const edgeMEssage = {
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
