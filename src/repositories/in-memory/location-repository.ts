import { LocationRepository } from "@/DTO/LocationRepository";
import { Location, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryLocationRepository implements LocationRepository{
  public locations: Location[]=[];
    
  private static INSTANCE: InMemoryLocationRepository;

  public static getInstante(): InMemoryLocationRepository{
    if(!InMemoryLocationRepository.INSTANCE){
      InMemoryLocationRepository.INSTANCE = new InMemoryLocationRepository();
    }
    return InMemoryLocationRepository.INSTANCE;
  }

  async findOrCreate(data: Prisma.LocationCreateInput): Promise<Location> {
    const {address,city,neighborhood,state,zipcode} = data;

    const location = {
      id: randomUUID(),
      address,
      neighborhood,
      city,
      zipcode,
      state,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    };
  
    this.locations.push(location);
  
    return location;
  }
}