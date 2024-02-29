import { WebSocket, WebSocketServer } from 'ws';

interface WebSocketConfig {
  wsUrl: string;
}

class WebSocketService {
  private client: WebSocket | null = null;
  private config: WebSocketConfig;

  constructor(config: WebSocketConfig) {
    this.config = config;
  }

  connect() {
    this.client = new WebSocket(this.config.wsUrl);

    this.client.on('open', () => {
      console.log('Conectado a WebSocket');
    });

    this.client.on('message', (data) => {
      console.log('Recibido de WebSocket:', data.toString());
    });

    this.client.on('close', () => {
      console.log('Desconectado de WebSocket');
      this.client = null;
    });

    this.client.on('error', (err) => {
      console.error('Error de WebSocket:', err);
    });
  }

  sendMessage(message: string) {
    if (this.client) {
      this.client.send(message);
      console.log('01');
    }
    console.log('02');
  }
}

export default WebSocketService;
