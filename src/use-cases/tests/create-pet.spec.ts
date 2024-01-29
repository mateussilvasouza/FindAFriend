import { InMemoryOrgRepository } from "@/repositories/in-memory/org-repository";
import {describe, it, expect, beforeEach} from "vitest";
import { OrgRepository } from "@/DTO/OrgRepository";
import { PetRepository } from "@/DTO/PetRepository";
import { InMemoryPetRepository } from "@/repositories/in-memory/pet-repository";
import { CreatePetUseCase } from "../create-pet";

let orgRepository: OrgRepository;
let petRepository: PetRepository;
let sut: CreatePetUseCase;

describe("Create Pet", ()=>{

  beforeEach(()=>{
    orgRepository = new InMemoryOrgRepository();
    petRepository = new InMemoryPetRepository();
    sut = new CreatePetUseCase(petRepository);
  });

  it("should be able to create pet", async ()=>{

    const org = await orgRepository.create({
      name: "FindAFriend",
      alias: "Encontre um amigo",
      cnpj: "11111111111111",
      phone: "11111111111",
      password: "123456"
    });

    const {pet} = await sut.execute({
      name: "Bob",
      age: "FILHOTE",
      autonomy: "BAIXO",
      description: "",
      orgId: org.id,
      race: "Pincher",
      species: "CACHORRO",
      energy: "5"        
    });

    expect(pet).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: "Bob",
      age: "FILHOTE",
      autonomy: "BAIXO",
      description: "",
      orgId: org.id,
      race: "Pincher",
      species: "CACHORRO",
      energy: "5"
    }));
  });
});