import { PrismaAddressRepository } from "@/repositories/prisma/address-repository";
import { PrismaLocationRepository } from "@/repositories/prisma/location-repository";
import { PrismaOrgRepository } from "@/repositories/prisma/org-repository";
import { CreateOrgUseCase } from "../create-org";

export function makeCreateOrgUseCase(){
  const orgRepository = new PrismaOrgRepository();
  const locationRepository = new PrismaLocationRepository();
  const addressRepository = new PrismaAddressRepository();
  const createOrgUseCase = new CreateOrgUseCase(orgRepository,locationRepository,addressRepository);

  return createOrgUseCase;
}