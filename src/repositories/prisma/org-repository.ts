import { OrgRepository } from "@/DTO/OrgRepository";
import { prisma } from "@/lib/prisma";
import { Org, Prisma } from "@prisma/client";

export class PrismaOrgRepository implements OrgRepository{
  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const orgCreated = await prisma.org.create({
      data
    });

    return orgCreated;
  }

  async findByCnpj(data: string): Promise<Org| null> {
    return await prisma.org.findUnique({
      where: {
        cnpj: data
      }
    });
  }

  async findById(data: string): Promise<Org|null> {
    const org = await prisma.org.findUnique({
      where: {
        id: data
      }
    });

    return org;
  }

  async getOrgPhone(data: string): Promise<string | null> {
    const org = await prisma.org.findUnique({
      where: {
        id: data
      }
    });
    
    if(!org) return null;

    return org.phone ;
  }
}