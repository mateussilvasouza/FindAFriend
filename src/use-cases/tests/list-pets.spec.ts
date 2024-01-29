import {describe, it, expect, beforeEach} from "vitest";
import { PetRepository } from "@/DTO/PetRepository";
import { InMemoryPetRepository } from "@/repositories/in-memory/pet-repository";
import { ListPetsUseCase } from "../list-pets";

let petRepository: PetRepository;
let sut: ListPetsUseCase;

describe("List Pets", ()=>{

  beforeEach(()=>{
    petRepository = new InMemoryPetRepository();
    sut = new ListPetsUseCase(petRepository);
  });

  it("should be able to list for city pet", async ()=>{

    for(let i = 0; i<5;i++){
      await petRepository.create({
        name: `Bob-${i}`,
        age: "FILHOTE",
        autonomy: "BAIXO",
        description: "",
        orgId: "2b45e043-624a-44b2-a0db-cd33d34c6669",
        race: "Pincher",
        species: "CACHORRO",
        energy: "5"        
      });
    }
    for(let i = 5; i<10;i++){
      await petRepository.create({
        name: `Bob-${i}`,
        age: "FILHOTE",
        autonomy: "BAIXO",
        description: "",
        orgId: "8bdf0f29-a87d-4531-8e44-3797eefdf559",
        race: "Pincher",
        species: "CACHORRO",
        energy: "5"        
      });
    }
    const {pets} = await sut.execute("Rio de Janeiro");

    expect(pets).toHaveLength(5);
    expect(pets).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        name: "Bob-0",
      }),
      expect.objectContaining({
        id: expect.any(String),
        name: "Bob-1",
      }),
      expect.objectContaining({
        id: expect.any(String),
        name: "Bob-2",
      }),
      expect.objectContaining({
        id: expect.any(String),
        name: "Bob-3",
      }),
      expect.objectContaining({
        id: expect.any(String),
        name: "Bob-4",
      }),
    ]);
  });

  it("should be able to list for city pet and characteristics", async ()=>{

    await petRepository.create({
      name: "Bob-0",
      age: "FILHOTE",
      autonomy: "BAIXO",
      description: "",
      orgId: "2b45e043-624a-44b2-a0db-cd33d34c6669",
      race: "Pincher",
      species: "CACHORRO",
      energy: "5"        
    });
    await petRepository.create({
      name: "Bob-1",
      age: "FILHOTE",
      autonomy: "ALTO",
      description: "",
      orgId: "2b45e043-624a-44b2-a0db-cd33d34c6669",
      race: "Pastor Alemão",
      species: "CACHORRO",
      energy: "5"        
    });

    await petRepository.create({
      name: "Bob-2",
      age: "FILHOTE",
      autonomy: "BAIXO",
      description: "",
      orgId: "8bdf0f29-a87d-4531-8e44-3797eefdf559",
      race: "Pincher",
      species: "CACHORRO",
      energy: "5"        
    });

    await petRepository.create({
      name: "Bob-3",
      age: "FILHOTE",
      autonomy: "ALTO",
      description: "",
      orgId: "8bdf0f29-a87d-4531-8e44-3797eefdf559",
      race: "Pincher",
      species: "CACHORRO",
      energy: "5"        
    });

    const {pets} = await sut.execute("Rio de Janeiro",{autonomy:"ALTO"});

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        name: "Bob-1",
      })
    ]);
  });
});