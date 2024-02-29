import { IAnimalRepository } from "../dominio/puertos/IAnimalRepository";

export class FindAllAnimals {
    constructor(private readonly repository: IAnimalRepository){}

    async run() {
        return await this.repository.findAll()
    }
}