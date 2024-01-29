import { AddressRepository } from "@/DTO/AddressRepository";
import { LocationRepository } from "@/DTO/LocationRepository";
import { OrgRepository } from "@/DTO/OrgRepository";
import bcrypt from "bcrypt";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

interface CreateOrgProps{
    name: string,
    alias: string | null,
    cnpj: string,
    password: string,
    phone: string
}

interface CreateLocationProps{
  address: string,
  neighborhood: string,
  city: string,
  zipcode: string,
  state: string
}

interface CreateAddressProps{
  number: string | null,
  complement: string | null,
  latitude: number,
  longitude: number,
}

interface CreateOrgUseCaseProps{
  org: CreateOrgProps,
  location: CreateLocationProps,
  address: CreateAddressProps
}

export class CreateOrgUseCase{
  constructor(
        private orgRepository: OrgRepository,
        private locationRepository: LocationRepository,
        private addressRepository: AddressRepository
  ){}

  async execute({location, org, address}:CreateOrgUseCaseProps){
    const findOrg = await this.orgRepository.findByCnpj(org.cnpj);

    if(findOrg){
      throw new OrgAlreadyExistsError();
    }

    const hashedPassword = await bcrypt.hash(org.password,await bcrypt.genSalt(12)); 
    org.password = hashedPassword;

    const locationCreated = await this.locationRepository.findOrCreate(location);

    const newOrg = await this.orgRepository.create(org);

    const newAddress = {
      locationId: locationCreated.id,
      orgId: newOrg.id,
      ...address
    };

    const organization = {
      ...newOrg,
      password: null
    };

    await this.addressRepository.create(newAddress);

    return {
      organization
    };
  }
}