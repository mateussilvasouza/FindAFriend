import { PrismaPetRepository } from "@/repositories/prisma/pet-repository";
import { ListPetsUseCase } from "../list-pets";

export function makeListPetsUseCase(){
  const petRepository = new PrismaPetRepository();
  const listPetsUseCase = new ListPetsUseCase(petRepository);

  return listPetsUseCase;
}