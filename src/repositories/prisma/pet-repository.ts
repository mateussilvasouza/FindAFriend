import { PetRepository, PetValidCharacteristic } from "@/DTO/PetRepository";
import { prisma } from "@/lib/prisma";
import { Pet, Prisma } from "@prisma/client";

export class PrismaPetRepository implements PetRepository{
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data
    });

    return pet;
  }
  async findById(data: string): Promise<Pet|null> {
    const pet = await prisma.pet.findUnique({
      where:{
        id:data,
        deletedAt: null
      }
    });

    return pet;
  }

  async findByCity(data: string, query: PetValidCharacteristic): Promise<Pet[] | null> {
    let pets = <Pet[]>await prisma.$queryRaw`
      select p.* from pets p
      inner join orgs o on o.id = p.org_id and o.deleted_at is null
      inner join addresses a on a.org_id = o.id and a.deleted_at is null
      inner join locations l on l.id = a.location_id and l.deleted_at is null
      where l.city = ${data} and p.deleted_at is null
      `;
  
    if(query.species !== "") pets = pets.filter(pet => pet.species === query.species);
    if(query.age !== "") pets = pets.filter(pet => pet.age === query.age);
    if(query.autonomy !== "") pets = pets.filter(pet => pet.autonomy === query.autonomy);
    if(query.energy !== "") pets = pets.filter(pet => pet.energy === query.energy);
    if(query.race !== "") pets = pets.filter(pet => pet.race === query.race);

    return pets;
  }

  async getOrgPhone(data: string): Promise<string | null> {
    const phones = await prisma.$queryRaw<string>`
        select o.phone from pets p
        inner join orgs o on o.id = p.org_id and o.deleted_at is null
        where p.id = ${data}
      `;
    return phones[0];
  }
}