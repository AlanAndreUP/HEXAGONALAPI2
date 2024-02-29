// ZooRoutes.ts
import { Router } from "express";
import { ZooController } from "./controllers/ZooController";
import { CreateZoo } from "../aplication/CreateZoo";
import { FindZoo } from "../aplication/FindZoo";
import { ZooRepositoryPrisma } from "./ZooRepositoryPrisma";
import { ZooRepository } from "./ZooRepositoryNotification";
const notifiactionRepository = new ZooRepository("amqp://papu:123456@34.195.235.24", "test", "1");

const zooRouter = Router();
const repository = new ZooRepositoryPrisma();
const createZoo = new CreateZoo(repository,notifiactionRepository);
const findZoo = new FindZoo(repository);
const zooController = new ZooController(createZoo, findZoo);

zooRouter.post('/', (req, res) => zooController.create(req, res));
zooRouter.post('/CreacionExitosa',(req,res)=>zooController.create(req,res));
zooRouter.get('/find/:id', (req, res) => zooController.find(req, res));

export default zooRouter;
