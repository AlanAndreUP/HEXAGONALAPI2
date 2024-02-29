import amqp, { Channel, Connection } from 'amqplib/callback_api';

interface AmqpConfig {
  amqpUrl: string;
  queueName: string;
}

class AmqpService {
  private connection: Connection | null = null;
  private channel: Channel | null = null;
  private config: AmqpConfig;

  constructor(config: AmqpConfig) {
    this.config = config;
  }

  connect() {
    amqp.connect(this.config.amqpUrl, (error0, connection) => {
      if (error0) {
        throw error0;
      }

      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }

        this.channel = channel;
        this.channel.assertQueue(this.config.queueName, {
          durable: false,
        });

        console.log('Conectado a AMQP, canal creado');
      });
    });
  }

  sendMessage(message: string) {
    if (this.channel) {
      this.channel.sendToQueue(this.config.queueName, Buffer.from(message));
    }
  }
}

export default AmqpService;
