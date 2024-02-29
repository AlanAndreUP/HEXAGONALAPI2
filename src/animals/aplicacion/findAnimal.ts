import { IAnimalRepository } from "../dominio/puertos/IAnimalRepository";

export class FindAnimal {
    constructor(private readonly repository: IAnimalRepository){}
    async run(id: number) {
        return await this.repository.findById(id)
    }
}