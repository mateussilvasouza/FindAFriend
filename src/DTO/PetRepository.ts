import { Pet, Prisma } from "@prisma/client";

export interface PetValidCharacteristic{
    age: string | null,
    autonomy: string | null,
    energy: string | null,
    species: string | null,
    race: string | null,
}

export interface PetRepository{
    create(data: Prisma.PetUncheckedCreateInput):Promise<Pet>
    findById(data: string):Promise<Pet|null>
    findByCity(data:string,query: PetValidCharacteristic):Promise<Pet[]|null>
    getOrgPhone(data:string):Promise<string|null>
}