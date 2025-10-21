import { IoTHuBClient } from "../../common/iothub/IotHubClient";
import { getOEMGpsMessage, getOEMWifiMessage, getEdgeGpsMessage } from "./messages";
import { TelemetryClient } from "applicationinsights";
import moment from "moment";

export const serviceName = "HealthProbe";

const TIMEOUT = 60 * 60 * 1000;

async function sendProbes() {
  const logger = new TelemetryClient(process.env.APPINSIGHTS_INSTRUMENTATIONKEY || "not available");
  logger.commonProperties["service"] = serviceName;

  try {
    const iotHubClient = new IoTHuBClient(process.env.IOTHUB_DEVICE_CONNECTION_STRING);

    let iotHubDeviceName = "HealthProbe-OEMGPS";
    let deviceId = 999999;
    let gpsMessage = getOEMGpsMessage(deviceId, { lat: -33.8056731, long: 150.91681 });
    console.log(`${moment.utc().toISOString()}: Sending health probe for device ${iotHubDeviceName}`);
    logger.trackEvent({
      name: "HealthProbe",
      properties: {
        iotHubDevice: iotHubDeviceName,
        deviceId: deviceId,
        probeName: iotHubDeviceName,
      },
    });
    await iotHubClient.sendMessages(iotHubDeviceName, [gpsMessage]);

    iotHubDeviceName = "HealthProbe-OEMWiFi";
    deviceId = 888888;
    let wifiMessage = getOEMWifiMessage(deviceId);
    console.log(`${moment.utc().toISOString()}: Sending health probe for device ${iotHubDeviceName}`);
    logger.trackEvent({
      name: "HealthProbe",
      properties: {
        iotHubDevice: iotHubDeviceName,
        deviceId: deviceId,
        probeName: iotHubDeviceName,
      },
    });
    await iotHubClient.sendMessages(iotHubDeviceName, [wifiMessage]);

    iotHubDeviceName = "HealthProbe-EdgeGPS";
    deviceId = 888888;
    let edgeMessage = getEdgeGpsMessage(deviceId, { lat: -34.8056731, long: 151.91681 });
    console.log(`${moment.utc().toISOString()}: Sending health probe for device ${iotHubDeviceName}`);
    logger.trackEvent({
      name: "HealthProbe",
      properties: {
        iotHubDevice: iotHubDeviceName,
        deviceId: deviceId,
        probeName: iotHubDeviceName,
      },
    });
    await iotHubClient.sendMessages(iotHubDeviceName, [edgeMessage]);
  } catch (error) {
    console.log("Error", error);
    logger.trackException(error);
  }

  setTimeout(sendProbes, TIMEOUT);
}

async function main() {
  await sendProbes();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
