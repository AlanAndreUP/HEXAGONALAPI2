// AnimalController.ts
import { Request, Response } from 'express';
import { CreateAnimals } from '../../aplicacion/createAnimals';
import { UpdateAnimals } from '../../aplicacion/updateAnimals';
import { FindAnimal } from '../../aplicacion/findAnimal';
import { FindAllAnimals } from '../../aplicacion/findAllAnimals';
import { DeleteAnimals } from '../../aplicacion/deleteAnimals';
import WebSocketService from '../../../config/websocket';
import AmqpService from '../../../config/amtqp';

export class AnimalController {
  constructor(
    private createAnimal: CreateAnimals,
    private updateAnimal: UpdateAnimals,
    private findAnimal: FindAnimal,
    private findAllAnimals: FindAllAnimals,
    private deleteAnimal: DeleteAnimals
  ) {}

  async create(req: Request, res: Response) {
    const { name, weight, age, type } = req.body;
    try {
      const webSocketService = new WebSocketService({ wsUrl: 'wss://websockethexagonal.onrender.com' });
      const amqpService = new AmqpService({
        amqpUrl: 'amqp://papu:123456@34.195.235.24',
        queueName: 'ColaFinal',
      }); 
      webSocketService.connect();
      amqpService.connect(); 
      await webSocketService.sendMessage("Enviado");
        await amqpService.sendMessage("Enviado");
      const animal = await this.createAnimal.run(name, weight, age, type);
      res.status(201).json({ animal });
    } catch (error) {
      res.status(400).json({ message: 'Error creating animal', error });
    }
  }

  async update(req: Request, res: Response) {
    const { name, weight, age, type } = req.body;
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).json({ message: 'Invalid ID provided' });
    }
    try {
      const animal = await this.updateAnimal.run(numericId, name, weight, age, type);
      res.status(200).json({ animal });
    } catch (error) {
      res.status(400).json({ message: 'Error updating animal', error });
    }
  }

  async find(req: Request, res: Response) {
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).json({ message: 'Invalid ID provided' });
    }
    try {
      const animal = await this.findAnimal.run(numericId);
      if (!animal) {
        return res.status(404).json({ message: 'Animal not found' });
      }
      res.status(200).json({ animal });
    } catch (error) {
      res.status(400).json({ message: 'Error finding animal', error });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const animals = await this.findAllAnimals.run();
      res.status(200).json({ animals });
    } catch (error) {
      res.status(400).json({ message: 'Error listing animals', error });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).json({ message: 'Invalid ID provided' });
    }
    try {
      await this.deleteAnimal.run(numericId);
      res.status(200).json({ message: 'Animal deleted', animalId: numericId });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting animal', error });
    }
  }
}
