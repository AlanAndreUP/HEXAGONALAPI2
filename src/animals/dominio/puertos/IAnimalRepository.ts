import { Animals } from "../animals";

export interface IAnimalRepository {
    save(product: Animals): Promise<Animals>;
    update(product: Animals): Promise<Animals>;
    findById(id: number): Promise<Animals >;
    findAll(): Promise<Animals[]>;
    delete(id: number): Promise<void>;
}

