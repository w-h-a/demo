/**
 * Interface for all notification clients.
 * Demos the fact that the service layer can depend on
 * other outbound clients; not just dbs
 */
export interface INotificationClient {
  notify(email: string, name: string): Promise<void>;
}
