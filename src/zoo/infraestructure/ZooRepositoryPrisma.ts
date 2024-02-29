import { PrismaClient } from "@prisma/client";
import { IZooRepository } from "../dominio/puertos/IZooRepository";
import { Zoo } from "../dominio/Zoo";


export class ZooRepositoryPrisma implements IZooRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(zoo: Zoo): Promise<Zoo> {
        const zooSaved = await this.prisma.zoo.create({
            data: {
                name: zoo.name,

            }
        });

        return new Zoo(
            zooSaved.name,
            zooSaved.id,
            zooSaved.createdAt,
            zooSaved.updatedAt
        );
    }
    async findById(id: number): Promise<Zoo > {
        const zoo = await this.prisma.zoo.findUnique({
            where: { id }
        });
    
        if (!zoo) {
            const getdat: Date = new Date();
            return new Zoo('', 0, getdat, getdat); 
        }
        return new Zoo(
            zoo.name,
            zoo.id,
            zoo.createdAt,
            zoo.updatedAt
        );
    }


}

