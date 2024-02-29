

export class Animals {
    name: string;
    weight: number;
    age: number;
    type: string;
    id: number;

    constructor(name: string, weight: number, age: number, type: string, id?: number) {
        this.name = name;
        this.weight = weight;
        this.age = age;
        this.type = type;
        this.id = id ?? 0;
    }

    update(name: string, weight: number, age: number, type: string) {
        this.name = name;
        this.weight = weight;
        this.age = age;
        this.type = type;
    }
}
