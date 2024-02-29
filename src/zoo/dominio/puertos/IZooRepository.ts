import { Zoo } from "../../dominio/Zoo";

export interface IZooRepository {
    create(user: Zoo): Promise<Zoo>;
    findById(id: number): Promise<Zoo >;
}