import { PrismaClient } from "@prisma/client";
import { IAnimalRepository } from "../dominio/puertos/IAnimalRepository";
import { Animals } from "../dominio/animals";

export class AnimalRepositoryPrisma implements IAnimalRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async save(animal: Animals): Promise<Animals> {
        const animalSaved = await this.prisma.animal.create({
            data: {
                name: animal.name,
                weight: animal.weight,
                age: animal.age,
                type: animal.type
            }
        });

        return new Animals(
            animalSaved.name,
            animalSaved.weight,
            animalSaved.age,
            animalSaved.type,
            animalSaved.id
        );
    }

    async update(animal: Animals): Promise<Animals> {
        const updatedAnimal = await this.prisma.animal.update({
            where: {
                id: animal.id
            },
            data: {
                name: animal.name,
                weight: animal.weight,
                age: animal.age,
                type: animal.type
            }
        });

        return new Animals(
            updatedAnimal.name,
            updatedAnimal.weight,
            updatedAnimal.age,
            updatedAnimal.type,
            updatedAnimal.id
        );
    }

    async findById(id: number): Promise<Animals > {
        const animal = await this.prisma.animal.findUnique({
            where: { id }
        });
    
        if (!animal) {
            return new Animals('', 0, 0, '', 0); 
        }
        return new Animals(
            animal.name,
            animal.weight,
            animal.age,
            animal.type,
            animal.id
        );
    }
    

    async findAll(): Promise<Animals[]> {
        const animals = await this.prisma.animal.findMany();
        return animals.map(animal => new Animals(
            animal.name,
            animal.weight,
            animal.age,
            animal.type,
            animal.id
        ));
    }

    async delete(id: number): Promise<void> {
        await this.prisma.animal.delete({
            where: {
                id
            }
        });
    }
}
