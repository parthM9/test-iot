import { OEMDeviceHeartbeat } from "../../types/oem/OEMDeviceHeartbeat";
import { OEMDeviceHeartbeatType } from "../../types/oem/types";

describe("message parsing utils", () => {
  it("sets iot hub device", () => {
    const data = getMessageWithMultipleRecords("MyIoTDevice");
    const output = data.getLocations();
    expect(output[0]?.deviceId).toEqual("MyIoTDevice");
  });

  it("returns message for each record and field of type", () => {
    const data = getMessageWithMultipleRecords("MyIoTDevice");
    const output = data.getLocations();
    expect(output.length).toEqual(2);
  });

  it("returns message for each record and field of type", () => {
    const data = getMessageWithMultipleRecords("MyIoTDevice");
    const output = data.getLocations();
    expect(output.length).toEqual(2);
  });

  it("lat is set correctly", () => {
    const data = getMessageWithMultipleRecords("MyIoTDevice");
    const output = data.getLocations();
    expect(output[0].location?.lat).toEqual(2);
    expect(output[1].location?.lat).toEqual(1);
  });

  it("long is set correctly", () => {
    const data = getMessageWithMultipleRecords("MyIoTDevice");
    const output = data.getLocations();
    expect(output[0].location?.long).toEqual(4);
    expect(output[1].location?.long).toEqual(3);
  });

  it("gps time is set correctly", () => {
    const data = getMessageWithMultipleRecords("MyIoTDevice");
    const output = data.getLocations();
    expect(output[0].location?.timeUTC).toEqual("2019-11-11T17:17:16Z");
    expect(output[1].location?.timeUTC).toEqual("2019-11-11T17:17:18Z");
  });

  it("serial number is set", () => {
    const data = getMessageWithMultipleRecords("MyIoTDevice");
    const output = data.getLocations();
    expect(output[0].externalDeviceId).toEqual("206169");
  });

  it("record time is set", () => {
    const data = getMessageWithMultipleRecords("MyIoTDevice");
    const output = data.getLocations();
    expect(output[0].timeUTC).toEqual("2019-11-14T17:23:02Z");
    expect(output[1].timeUTC).toEqual("2019-11-14T17:23:04Z");
  });

  it("requires geo location returns false for GPS field", () => {
    const data = getMessageWithMultipleRecords("MyIoTDevice");
    expect(data.requiresGeoLocation()).toEqual(false);
  });

  it("requires geo location returns true for Wifi field", () => {
    const data = getMessageWithWifi("MyIoTDevice");
    expect(data.requiresGeoLocation()).toEqual(true);
  });
});

function getMessageWithMultipleRecords(iotHubDeviceId: string): OEMDeviceHeartbeat {
  const payload: OEMDeviceHeartbeatType = {
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
            Lat: 2,
            Long: 4,
            Alt: 0,
            Spd: 0,
            SpdAcc: 3,
            Head: 2,
            PDOP: 4,
            PosAcc: 7,
            GpsStat: 234,
            FType: 0,
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
        ],
      },
      {
        SeqNo: 289,
        Reason: 11,
        DateUTC: "2019-11-14 17:23:04",
        Fields: [
          {
            GpsUTC: "2019-11-11 17:17:18",
            Lat: 1,
            Long: 3,
            Alt: 0,
            Spd: 0,
            SpdAcc: 3,
            Head: 2,
            PDOP: 4,
            PosAcc: 7,
            GpsStat: 234,
            FType: 0,
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
        ],
      },
    ],
  };
  return new OEMDeviceHeartbeat(payload, iotHubDeviceId);
}

function getMessageWithWifi(iotHubDeviceId: string): OEMDeviceHeartbeat {
  const payload: OEMDeviceHeartbeatType = {
    SerNo: 181347,
    IMEI: "352753092930476",
    ICCID: "89610185002543609307",
    ProdId: 72,
    FW: "72.2.2.2",
    Records: [
      {
        SeqNo: 4692,
        Reason: 11,
        DateUTC: "2021-07-07 22:26:29",
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
        ],
      },
    ],
  };
  return new OEMDeviceHeartbeat(payload, iotHubDeviceId);
}
