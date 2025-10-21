import { Client, Message } from "azure-iot-device";
import { Http } from "azure-iot-device-http";

export class IoTHuBClient {
  private connectionString: string;
  constructor(private readonly deviceConnectionString: string) {
    this.connectionString = deviceConnectionString
      .split(";")
      .filter((i) => !i.toLowerCase().includes("deviceid"))
      .join(";");
  }

  async sendMessages(iotHubDeviceName: string, messageData: any[]): Promise<void> {
    const deviceConnectionString = `${this.connectionString};DeviceId=${iotHubDeviceName}`;
    let client = Client.fromConnectionString(deviceConnectionString, Http);

    const messages = messageData.map((message) => new Message(JSON.stringify(message)));

    await client.open();

    await Promise.all(
      messages.map((msg) => {
        client.sendEvent(msg, () => console.log("Sent msg"));
      }),
    );

    await client.close();
  }
}
