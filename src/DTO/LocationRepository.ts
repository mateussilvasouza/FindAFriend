import { Location, Prisma } from "@prisma/client";

export interface LocationRepository{
    findOrCreate(data: Prisma.LocationCreateInput): Promise<Location>
}