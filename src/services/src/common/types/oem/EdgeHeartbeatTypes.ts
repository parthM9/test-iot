export type EdgeAnalogueField = {
  id: number;
  val: number;
};

export interface IEdgeDeviceHeartbeat {
  date: string;
  device: {
    sn: string; //serial number
    prod: number; // product
    rev: number;
    fw: string; //1.12
    iccid: string;
    imei: string;
  };
  sqn: number;
  reason: number;
  lat: number;
  lng: number;
  posAcc: number; // meters
  posInfo: {
    Src: number; // ??
  };
  analogues: EdgeAnalogueField[];
  inputs: number;
  outputs: number;
  status: number;
}

// For reference
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
