import { INotificationClient } from '../notification';

/**
 * An in-memory implementation of the notification client.
 */
export class InMemoryNotificationClient implements INotificationClient {
  async notify(email: string, name: string): Promise<void> {
    console.log(`[MemoryNotify] Sending notification to ${name} at ${email}`);

    return Promise.resolve();
  }
}
