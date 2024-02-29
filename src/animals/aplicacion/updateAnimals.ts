import { IAnimalRepository } from "../dominio/puertos/IAnimalRepository";

export class UpdateAnimals {
    constructor(private readonly repository: IAnimalRepository){}
    async run(id: number, name: string, weight: number, age: number, type: string) {
        const Animals = await this.repository.findById(id)
        Animals.update(name,  weight, age, type)
        return await this.repository.update(Animals)
    }

}