import { AddressRepository } from "@/DTO/AddressRepository";
import { prisma } from "@/lib/prisma";
import { Address, Prisma } from "@prisma/client";

export class PrismaAddressRepository implements AddressRepository{
  async create(data: Prisma.AddressUncheckedCreateInput): Promise<Address> {
    return await prisma.address.create({data});
  }
}