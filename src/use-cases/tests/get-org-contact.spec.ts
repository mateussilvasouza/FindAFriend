import {describe, it, expect, beforeEach} from "vitest";
import { GetOrgContactUseCase } from "../get-org-contact";
import { PetRepository } from "@/DTO/PetRepository";
import { InMemoryPetRepository } from "@/repositories/in-memory/pet-repository";

let petRepository: PetRepository;
let sut: GetOrgContactUseCase;

describe("Get Org Contact", ()=>{

  beforeEach(()=>{
    petRepository = new InMemoryPetRepository();
    sut = new GetOrgContactUseCase(petRepository);
  });

  it("should be able to get the contact number of the organization responsible for the pet", async ()=>{
    const pet = await petRepository.create({
      name: "Bob",
      age: "FILHOTE",
      autonomy: "BAIXO",
      description: "",
      orgId: "2b45e043-624a-44b2-a0db-cd33d34c6669",
      race: "Pincher",
      species: "CACHORRO",
      energy: "5"        
    });
    const {phone} = await sut.execute(pet.id);

    expect(phone).toEqual("11111111111");
  });
});