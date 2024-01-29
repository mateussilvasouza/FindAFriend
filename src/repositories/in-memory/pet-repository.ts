import { PetRepository, PetValidCharacteristic } from "@/DTO/PetRepository";
import { addressesSeeds } from "@/tests/seeds/address-seeds";
import { locationSeed } from "@/tests/seeds/location-seeds";
import { orgSeeds } from "@/tests/seeds/org-seeds";
import { Prisma, Pet, Location, Address, Org} from "@prisma/client";
import { randomUUID } from "crypto";

export class InMemoryPetRepository implements PetRepository{
  public pets: Pet[] = [];
  public address: Address[] = addressesSeeds;
  public locations: Location[] = locationSeed;
  public org: Org[] = orgSeeds;

  private static INSTANCE: InMemoryPetRepository;

  public static getInstante(): InMemoryPetRepository{
    if(!InMemoryPetRepository.INSTANCE){
      InMemoryPetRepository.INSTANCE = new InMemoryPetRepository();
    }
    return InMemoryPetRepository.INSTANCE;
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      autonomy: data.autonomy,
      species: data.species,
      race: data.race,
      energy: data.energy,
      orgId: data.orgId,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    this.pets.push(pet);

    return pet;
  }
  async findById(data: string): Promise<Pet|null> {
    const pet = this.pets.find(pet => pet.id === data);

    if(!pet) return null;

    return pet;
  }

  async findByCity(data: string, query: PetValidCharacteristic): Promise<Pet[]|null> {
    const locations = this.locations.filter(location => location.city === data);

    const addresses = <Address[]>[];
    locations.forEach(location => {
      this.address.forEach(address => {
        if(location.id === address.locationId) addresses.push(address);
      });
    });

    let pets = <Pet[]>[];
    this.pets.forEach(pet => {
      addresses.forEach(address => {
        if(address.orgId === pet.orgId) pets.push(pet);
      });
    });

    if(query.species) pets = pets.filter(pet => pet.species === query.species);
    if(query.age) pets = pets.filter(pet => pet.age === query.age);
    if(query.autonomy) pets = pets.filter(pet => pet.autonomy === query.autonomy);
    if(query.energy) pets = pets.filter(pet => pet.energy === query.energy);
    if(query.race) pets = pets.filter(pet => pet.race === query.race);
    
    return pets;
  }

  async getOrgPhone(data: string): Promise<string|null> {
    const pet = this.pets.find(pet => pet.id === data);

    if (!pet) return null;

    const org = this.org.find(org => org.id === pet.orgId);
    
    if(!org) return null;

    return org.phone;
  }
}