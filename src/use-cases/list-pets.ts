import { PetRepository, PetValidCharacteristic } from "@/DTO/PetRepository";
import { ResourceNotFoundError } from "./errors/resouce-not-found-error";

export class ListPetsUseCase{
  constructor(
        private petRepository: PetRepository,
  ){}

  async execute(data:string, query: PetValidCharacteristic){
    const pets = await this.petRepository.findByCity(data, query);
    
    if(!pets){
      throw new ResourceNotFoundError();
    }

    return {
      pets
    };
  }
}