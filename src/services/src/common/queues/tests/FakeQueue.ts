export class FakeQueue {
  public messageText: string | undefined;
  putMessage(text: string): Promise<void> {
    this.messageText = text;
    return Promise.resolve();
  }
}
