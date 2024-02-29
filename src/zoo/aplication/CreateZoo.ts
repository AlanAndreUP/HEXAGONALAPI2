import { IZooRepository } from "../dominio/puertos/IZooRepository"; 
import { Zoo } from "../dominio/Zoo"; 
import { IzooNotificationProducer } from "../dominio/puertos/IZooNotification";

export class CreateZoo {
    constructor(private readonly repository: IZooRepository,private readonly notifiactionRepository:IzooNotificationProducer){}

    async run(name: string, id?: number, createdAt?: Date, updatedAt?: Date){
        const zoo = new Zoo(name, id, createdAt, updatedAt);
        if(await this.repository.create(zoo))
            this.notifiactionRepository.send("ZooCreated! hola rodri")
        else
        this.notifiactionRepository.send(" Not ZooCreated!")
        return zoo;
    }
}
