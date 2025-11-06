import { INotificationClient } from '../notification';

/**
 * Mock implementation of INotificationClient
 */
export class MockNotificationClient implements INotificationClient {
  notify = jest.fn<Promise<void>, [string, string]>();
}
