import { IAnimalRepository } from "../dominio/puertos/IAnimalRepository";
import { Animals } from "../dominio/animals";

export class CreateAnimals {
    constructor(private readonly repository: IAnimalRepository){}

    async run(name: string, weight: number, age: number, type: string) {
        const product = new Animals( name, weight, age, type)
        return await this.repository.save(product)
    }
}