import { InMemoryOrgRepository } from "@/repositories/in-memory/org-repository";
import {describe, it, expect, beforeEach} from "vitest";
import { CreateOrgUseCase } from "../create-org";
import { InMemoryLocationRepository } from "@/repositories/in-memory/location-repository";
import { InMemoryAddressRepository } from "@/repositories/in-memory/address-repository";
import { OrgRepository } from "@/DTO/OrgRepository";
import { LocationRepository } from "@/DTO/LocationRepository";
import { AddressRepository } from "@/DTO/AddressRepository";
import { OrgAlreadyExistsError } from "../errors/org-already-exists-error";


let orgRepository: OrgRepository;
let locationRepository: LocationRepository;
let addressRepository: AddressRepository;
let createOrgUseCase: CreateOrgUseCase;

describe("Create Org", ()=>{

  beforeEach(()=>{
    orgRepository = new InMemoryOrgRepository();
    locationRepository = new InMemoryLocationRepository();
    addressRepository = new InMemoryAddressRepository();
    createOrgUseCase = new CreateOrgUseCase(orgRepository, locationRepository, addressRepository);
  });

  it("should be able to create org", async ()=>{

    const org = {
      name: "FindAFriend",
      alias: "Encontre um amigo",
      cnpj: "11111111111111",
      phone: "11111111111",
      password: "123456"
    };

    const address = {
      number: "221",
      complement: null,
      latitude: -22.8204675,
      longitude: -43.0122228
    };

    const location = {
      address: "Avenida Jornalista Roberto Marinho",
      neighborhood: "Mutondo",
      city: "São Gonçalo",
      zipcode: "24451715",
      state: "RJ"
    };

    const {organization} = await createOrgUseCase.execute({
      org,
      location,
      address
    });

    expect(organization).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: "FindAFriend",
      alias: "Encontre um amigo",
      cnpj: "11111111111111",
      phone: "11111111111"
    }));
  });

  it("should not be possible to create an org with a CNPJ already registered",async ()=>{
    const org = {
      name: "FindAFriend",
      alias: "Encontre um amigo",
      cnpj: "11111111111111",
      phone: "11111111111",
      password: "123456"
    };
  
    const address = {
      number: "221",
      complement: null,
      latitude: -22.8204675,
      longitude: -43.0122228
    };
  
    const location = {
      address: "Avenida Jornalista Roberto Marinho",
      neighborhood: "Mutondo",
      city: "São Gonçalo",
      zipcode: "24451715",
      state: "RJ"
    };
  
    await createOrgUseCase.execute({
      org,
      location,
      address
    });

    await expect(async ()=>{
      await createOrgUseCase.execute({
        org,
        location,
        address
      });
    }).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});