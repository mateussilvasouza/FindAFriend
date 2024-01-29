import { PrismaPetRepository } from "@/repositories/prisma/pet-repository";
import { GetOrgContactUseCase } from "../get-org-contact";

export function makeGetOrgContactUseCase(){
  const petRepository = new PrismaPetRepository();
  const getOrgContactUseCase = new GetOrgContactUseCase(petRepository);

  return getOrgContactUseCase;
}