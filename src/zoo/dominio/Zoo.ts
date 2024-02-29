import { Animals } from '../../animals/dominio/animals';
export class Zoo {
    public animals: Animals[] = [];
    public id?: number;
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor(
        public name: string,
        id?: number,
        createdAt?: Date,
        updatedAt?: Date,
    ) {
        this.id = id ?? 0;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }

    
}
