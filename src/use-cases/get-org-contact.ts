import { ResourceNotFoundError } from "./errors/resouce-not-found-error";
import { PetRepository } from "@/DTO/PetRepository";

export class GetOrgContactUseCase{
  constructor(
        private petRepository: PetRepository,
  ){}

  async execute(data: string){
    const phone = await this.petRepository.getOrgPhone(data);
  
    if(!phone){
      throw new ResourceNotFoundError();
    }

    return {
      phone
    };
  }
}