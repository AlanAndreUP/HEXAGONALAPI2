import { IZooRepository } from "../dominio/puertos/IZooRepository";

export class FindZoo {
    constructor(private readonly repository: IZooRepository){}
    async run(id: number) {
        return await this.repository.findById(id)
    }
}