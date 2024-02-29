import { IAnimalRepository } from "../dominio/puertos/IAnimalRepository";

export class DeleteAnimals {
    constructor(private readonly repository: IAnimalRepository){}
    async run(id: number) {
        return await this.repository.delete(id)
    }
}