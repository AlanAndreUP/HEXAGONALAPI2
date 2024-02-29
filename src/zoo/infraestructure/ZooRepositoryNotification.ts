import { connect } from 'amqplib';
import { IzooNotificationProducer } from '../dominio/puertos/IZooNotification';

export class ZooRepository implements IzooNotificationProducer {
  constructor(private amqpUrl: string, private exchange: string, private routingKey: string, private exchangeType: string = 'direct') {}

  async send(message: string): Promise<void> {
    let connection, channel;
    try {
      connection = await connect(this.amqpUrl);
      channel = await connection.createChannel();
      await channel.assertExchange(this.exchange, this.exchangeType, { durable: false });
      channel.publish(this.exchange, this.routingKey, Buffer.from(message));
      console.log("Message sent to exchange '%s' with routing key '%s': %s", this.exchange, this.routingKey, message);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      if (channel) await channel.close();
      if (connection) await connection.close();
    }
  }
}
