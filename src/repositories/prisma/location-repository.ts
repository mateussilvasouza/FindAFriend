import { LocationRepository } from "@/DTO/LocationRepository";
import { prisma } from "@/lib/prisma";
import { Location, Prisma } from "@prisma/client";

export class PrismaLocationRepository implements LocationRepository{
  async findOrCreate(data: Prisma.LocationCreateInput): Promise<Location> {
    const locationAlreadyExists = await prisma.location.findUnique({
      where:{
        zipcode: data.zipcode
      }
    });

    if(locationAlreadyExists){
      return locationAlreadyExists;
    }

    return await prisma.location.create({
      data
    });
  }
}