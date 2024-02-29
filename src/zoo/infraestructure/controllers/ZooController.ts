import { Request, Response } from "express";
import { CreateZoo } from "../../aplication/CreateZoo";
import { FindZoo } from "../../aplication/FindZoo";
import { ZooRepositoryPrisma } from "../ZooRepositoryPrisma";
import { ZooRepository } from "../ZooRepositoryNotification";
const repository = new ZooRepositoryPrisma();
const notifiactionRepository = new ZooRepository("amqp://papu:123456@34.195.235.24", "test", "1");

const createZoo = new CreateZoo(repository,notifiactionRepository);
const findZoo = new FindZoo(repository);

export class ZooController {
  constructor(
    private readonly createZoo: CreateZoo,
    private readonly findZoo: FindZoo
  ) {}

  async create(req: Request, res: Response) {
    const { name, location } = req.body;
    try {
      const zoo = await this.createZoo.run(name, location);
      res.status(201).json({ zoo });
    } catch (error) {
      res.status(500).json({ message: 'There was an error creating the zoo', error });
    }
  }

  async find(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        return res.status(400).json({ message: 'The provided ID is not valid' });
      }
      const zoo = await this.findZoo.run(numericId);
      if (!zoo) {
        return res.status(404).json({ message: 'Zoo not found' });
      }
      res.status(200).json({ zoo });
    } catch (error) {
      res.status(500).json({ message: 'There was an error finding the zoo', error });
    }
  }
  async CreacionExitosa(req: Request, res: Response) {
    
    try {

      res.status(200).json({ "Created":1 });
    } catch (error) {
      res.status(500).json({ message: 'There was an error Created the zoo', error });
    }
  }
}