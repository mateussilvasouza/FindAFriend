import { PetRepository } from "@/DTO/PetRepository";
import { Prisma } from "@prisma/client";

export class CreatePetUseCase{
  constructor(
    private petRepository: PetRepository
  ){}

  async execute(data: Prisma.PetUncheckedCreateInput){
    const pet = await this.petRepository.create(data);

    return {
      pet
    };
  }
}