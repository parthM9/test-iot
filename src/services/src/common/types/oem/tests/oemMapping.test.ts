import { AnalogueFieldId } from "../Fields";
import { OEMDeviceHeartbeat } from "../OEMDeviceHeartbeat";
import { GPSFieldType } from "../types";
import { edgeHeartbeatPayload, oemHeartbeatPayload } from "./testdata";
import crypto from "crypto";
import { convertOEMDateToISO8601 } from "../../../utils";
import { EdgeDeviceHeartbeat } from "../EdgeDeviceHeartbeat";

describe("test mapping OEM types to class", () => {
  it("canary", () => {
    expect(true).toBeTruthy();
  });

  describe("payload", () => {
    it("serial number maps", () => {
      const payload = new OEMDeviceHeartbeat(getPayload(), "device123");
      expect(payload.serialNumber).toEqual(206169);
    });

    it("IMEI maps", () => {
      const payload = new OEMDeviceHeartbeat(getPayload(), "device123");
      expect(payload.IMEI).toEqual("356726100970870");
    });

    it("ICCID maps", () => {
      const payload = new OEMDeviceHeartbeat(getPayload(), "device123");
      expect(payload.ICCID).toEqual("89610185002364857485");
    });

    it("product id maps", () => {
      const payload = new OEMDeviceHeartbeat(getPayload(), "device123");
      expect(payload.productId).toEqual(74);
    });

    it("firmware id maps", () => {
      const payload = new OEMDeviceHeartbeat(getPayload(), "device123");
      expect(payload.FW).toEqual("74.2.2.4");
    });
  });

  describe("records", () => {
    it("correct number mapped", () => {
      const payload = getPayload();
      const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
      expect(heartbeat.records.length).toEqual(payload.Records.length);
    });

    it("sequence number mapped", () => {
      const payload = getPayload();
      const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
      expect(heartbeat.records[0].sequenceNumber).toEqual(payload.Records[0].SeqNo);
    });

    it("reason mapped", () => {
      const payload = getPayload();
      const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
      expect(heartbeat.records[0].reason).toEqual(payload.Records[0].Reason);
    });

    it("record date is mapped", () => {
      const payload = getPayload();
      const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
      // Make sure date is converted to ISO 8601
      expect(heartbeat.records[0].dateUTC).toEqual("2019-11-14T17:23:02Z");
    });
  });

  describe("fields", () => {
    it("correct number mapped", () => {
      const payload = getPayload();
      const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
      expect(heartbeat.records[0].fields.length).toEqual(payload.Records[0].Fields.length);
    });

    describe("gps", () => {
      it("lat mapped", () => {
        const payload = getPayload();
        const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
        expect(heartbeat.records[0].fields[0].gps.lat).toEqual((payload.Records[0].Fields[0] as GPSFieldType).Lat);
      });

      it("long mapped", () => {
        const payload = getPayload();
        const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
        expect(heartbeat.records[0].fields[0].gps.long).toEqual((payload.Records[0].Fields[0] as GPSFieldType).Long);
      });

      it("speed mapped", () => {
        const payload = getPayload();
        const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
        expect(heartbeat.records[0].fields[0].gps.speed).toEqual((payload.Records[0].Fields[0] as GPSFieldType).Spd);
      });

      it("speed accuracy mapped", () => {
        const payload = getPayload();
        const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
        expect(heartbeat.records[0].fields[0].gps.speedAccuracy).toEqual((payload.Records[0].Fields[0] as GPSFieldType).SpdAcc);
      });

      it("altitude mapped", () => {
        const payload = getPayload();
        const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
        expect(heartbeat.records[0].fields[0].gps.altitude).toEqual((payload.Records[0].Fields[0] as GPSFieldType).Alt);
      });

      it("heading mapped", () => {
        const payload = getPayload();
        const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
        expect(heartbeat.records[0].fields[0].gps.heading).toEqual((payload.Records[0].Fields[0] as GPSFieldType).Head);
      });

      it("gps stat mapped", () => {
        const payload = getPayload();
        const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
        expect(heartbeat.records[0].fields[0].gps.gpsStat).toEqual((payload.Records[0].Fields[0] as GPSFieldType).GpsStat);
      });

      it("gps time mapped", () => {
        const payload = getPayload();
        const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
        // ISO 8601
        expect(heartbeat.records[0].fields[0].gps.gpsUTC).toEqual("2019-11-11T17:17:16Z");
      });

      it("position mapped", () => {
        const payload = getPayload();
        const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
        expect(heartbeat.records[0].fields[0].gps.positionAccuracy).toEqual((payload.Records[0].Fields[0] as GPSFieldType).PosAcc);
      });

      it("PDOP mapped", () => {
        const payload = getPayload();
        const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
        expect(heartbeat.records[0].fields[0].gps.PDOP).toEqual((payload.Records[0].Fields[0] as GPSFieldType).PDOP);
      });
    });

    describe("access points", () => {
      it("access point fields map", () => {
        const payload = getPayload();
        const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
        const accessPointsField = heartbeat.records[0].fields.find((f) => f.isAccessPoints).accessPoints;
        expect(accessPointsField.accessPoints.length).toEqual(2);
        expect(accessPointsField.accessPoints[0].mac).toEqual("74:83:C2:B7:D0:ED");
        expect(accessPointsField.accessPoints[0].channel).toEqual(11);
        expect(accessPointsField.accessPoints[0].signalStrength).toEqual(-32);
        expect(accessPointsField.accessPoints[0].toGoogleFormat()).toEqual({
          age: 0,
          channel: 11,
          macAddress: "74:83:C2:B7:D0:ED",
          signalStrength: -32,
          signalToNoiseRatio: 0,
        });
      });
    });

    describe("cell towers", () => {
      it("cell tower fields map", () => {
        const payload = getPayload();
        const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
        const towersField = heartbeat.records[0].fields.find((f) => f.isTowers).towersField;
        expect(towersField.towers.length).toEqual(1);
        expect(towersField.towers[0].cellId).toEqual(137561869);
        expect(towersField.towers[0].locationAreaCode).toEqual(12384);
        expect(towersField.towers[0].mobileCountryCode).toEqual(505);
        expect(towersField.towers[0].mobileNetworkCode).toEqual(1);
        expect(towersField.towers[0].toGoogleFormat()).toEqual({
          cellId: 137561869,
          locationAreaCode: 12384,
          mobileCountryCode: 505,
          mobileNetworkCode: 1,
        });
      });
    });

    describe("analogue", () => {
      it("field type", () => {
        const payload = getPayload();
        const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
        const analogueField = heartbeat.records[0].fields.find((f) => f.isAnalogue).analogue;
        expect(analogueField.fieldType).toEqual(AnalogueFieldId);
      });

      it("internal voltage", () => {
        const payload = getPayload();
        const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
        const analogueField = heartbeat.records[0].fields.find((f) => f.isAnalogue).analogue;
        expect(analogueField.internalBatteryVoltage).toEqual(4.631);
      });

      it("external voltage", () => {
        const payload = getPayload();
        const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
        const analogueField = heartbeat.records[0].fields.find((f) => f.isAnalogue).analogue;
        expect(analogueField.externalBatteryVoltage).toEqual(undefined);
      });

      it("remaining battery percent", () => {
        const payload = getPayload();
        const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
        const analogueField = heartbeat.records[0].fields.find((f) => f.isAnalogue).analogue;
        expect(analogueField.remainingBatteryPercent).toEqual(97.87);
      });

      it("temperature", () => {
        const payload = getPayload();
        const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
        const analogueField = heartbeat.records[0].fields.find((f) => f.isAnalogue).analogue;
        expect(analogueField.temperature).toEqual(18.95);
      });
    });

    describe("verify new hashable matches old", () => {
      it("record", () => {
        const payload = getPayload();
        const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
        const record = heartbeat.records[0];

        const hashableMessage = `${JSON.stringify(payload)}:${JSON.stringify(payload.Records[0])}`;
        const idWithOldHash = crypto.createHash("sha256").update(JSON.stringify(hashableMessage)).digest("base64");

        expect(idWithOldHash).toEqual(record.hashable);
      });

      it("field", () => {
        const payload = getPayload();
        const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
        const field = heartbeat.records[0].fields[0];

        const hashableMessage = `${JSON.stringify(payload)}:${JSON.stringify(payload.Records[0])}:${JSON.stringify(
          payload.Records[0].Fields[0],
        )}`;
        const idWithOldHash = crypto.createHash("sha256").update(JSON.stringify(hashableMessage)).digest("base64");

        expect(idWithOldHash).toEqual(field.hashable);
      });
    });

    describe("device locations", () => {
      it("OEM record fields map to locations", () => {
        const payload = getPayload() as any;
        const heartbeat = new OEMDeviceHeartbeat(payload, "device123");
        const locations = heartbeat.getLocations();

        expect(locations.length).toEqual(1);
        expect(locations[0].deviceId).toEqual("device123");
        expect(locations[0].externalDeviceId).toEqual("206169");
        expect(locations[0].location.lat).toEqual(payload.Records[0].Fields[0].Lat);
        expect(locations[0].location.long).toEqual(payload.Records[0].Fields[0].Long);
        expect(locations[0].location.timeUTC).toEqual(convertOEMDateToISO8601(payload.Records[0].Fields[0].GpsUTC));
        expect(locations[0].timeUTC).toEqual(convertOEMDateToISO8601(payload.Records[0].DateUTC));
        expect(locations[0].reason).toEqual(payload.Records[0].Reason);
        expect(locations[0].productId).toEqual(payload.ProdId);
      });

      it("Edge fields map to locations", () => {
        const payload = edgeHeartbeatPayload;
        const heartbeat = new EdgeDeviceHeartbeat(payload, "device123");
        const locations = heartbeat.getLocations();

        expect(locations.length).toEqual(1);
        expect(locations[0].deviceId).toEqual("device123");
        expect(locations[0].externalDeviceId).toEqual("416197");
        expect(locations[0].location.lat).toEqual(payload.lat);
        expect(locations[0].location.long).toEqual(payload.lng);
        expect(locations[0].location.positionAccuracy).toEqual(payload.posAcc);
        expect(locations[0].location.timeUTC).toEqual(payload.date);
        expect(locations[0].timeUTC).toEqual(payload.date);
        expect(locations[0].reason).toEqual(payload.reason);
        expect(locations[0].productId).toEqual(payload.device.prod);
      });
    });
  });
});

function getPayload() {
  return oemHeartbeatPayload;
}
