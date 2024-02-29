export interface IzooNotificationProducer {
    send(message: string): Promise<void>;
  }
  
