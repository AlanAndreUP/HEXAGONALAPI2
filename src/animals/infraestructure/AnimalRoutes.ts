// AnimalRoutes.ts
import { Router } from 'express';
import { AnimalController } from './controllers/AnimalController';
import { CreateAnimals } from '../aplicacion/createAnimals';
import { UpdateAnimals } from '../aplicacion/updateAnimals';
import { AnimalRepositoryPrisma } from './AnimalRepositoryPrisma';
import { FindAnimal } from '../aplicacion/findAnimal';
import { FindAllAnimals } from '../aplicacion/findAllAnimals';
import { DeleteAnimals } from '../aplicacion/deleteAnimals';

const animalRouter = Router();
const animalRepository = new AnimalRepositoryPrisma();

const createAnimalsService = new CreateAnimals(animalRepository);
const updateAnimalsService = new UpdateAnimals(animalRepository);
const findAnimalService = new FindAnimal(animalRepository);
const findAllAnimalsService = new FindAllAnimals(animalRepository);
const deleteAnimalsService = new DeleteAnimals(animalRepository);

const animalController = new AnimalController(
  createAnimalsService,
  updateAnimalsService,
  findAnimalService,
  findAllAnimalsService,
  deleteAnimalsService
);

animalRouter.post('/', (req, res) => animalController.create(req, res));
animalRouter.put('/update/:id', (req, res) => animalController.update(req, res));
animalRouter.get('/find/:id', (req, res) => animalController.find(req, res));
animalRouter.get('/', (req, res) => animalController.findAll(req, res));
animalRouter.delete('/delete/:id', (req, res) => animalController.delete(req, res));

export default animalRouter;
