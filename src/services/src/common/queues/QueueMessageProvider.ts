import { DequeuedMessageItem, QueueClient, QueueReceiveMessageOptions, QueueServiceClient } from "@azure/storage-queue";

export class QueueMessageProvider {
  public static async Create(connectionString: string, queueName: string) {
    const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);
    const queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.createIfNotExists();
    return new QueueMessageProvider(queueClient);
  }

  private processMessage: ((message: DequeuedMessageItem) => Promise<void>) | undefined;

  private constructor(private queueClient: QueueClient) {}

  async putMessage(message: string): Promise<void> {
    await this.queueClient.sendMessage(message);
  }

  subscribe(processMessage: (messages: DequeuedMessageItem) => Promise<void>, processError: () => void) {
    this.processMessage = processMessage;
    this.startProcessing();
  }

  startProcessing() {
    const innerProcessMessages = () => {
      const options: QueueReceiveMessageOptions = {
        visibilityTimeout: 30, // seconds
        numberOfMessages: 10, // messages at a time
      };
      this.queueClient.receiveMessages(options).then((receivedMsgsResp) => {
        if (!this.processMessage) {
          return;
        }

        try {
          if (receivedMsgsResp && receivedMsgsResp.receivedMessageItems.length > 0) {
            console.log("Received messages: ", receivedMsgsResp.receivedMessageItems.length);

            for (let i = 0; i < receivedMsgsResp.receivedMessageItems.length; i++) {
              try {
                const message = receivedMsgsResp.receivedMessageItems[i];
                this.processMessage(message)
                  .then((v) => {
                    this.queueClient
                      .deleteMessage(message.messageId, message.popReceipt)
                      .then((resp) => console.log("Deleted message", message.messageId));
                  })
                  .catch((err) => {
                    console.log("Failed to process message", err.message);
                  });
              } catch (err) {
                console.log("Failed to process message", err.message);
              }
            }
          }
        } catch (err) {
          console.log(err);
        }

        setTimeout(innerProcessMessages, 15000);
      });
    };

    innerProcessMessages();
  }
}
//
