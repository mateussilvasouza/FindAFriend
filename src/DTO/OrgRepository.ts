import { Org, Prisma } from "@prisma/client";

export interface OrgRepository{
    create(data: Prisma.OrgCreateInput):Promise<Org>
    findById(data: string):Promise<Org|null>
    findByCnpj(data: string):Promise<Org|null>
}