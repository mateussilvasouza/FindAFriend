import { AddressRepository } from "@/DTO/AddressRepository";
import { Address, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

export class InMemoryAddressRepository implements AddressRepository{
  public address: Address[] = [];

  private static INSTANCE: InMemoryAddressRepository;

  public static getInstante(): InMemoryAddressRepository{
    if(!InMemoryAddressRepository.INSTANCE){
      InMemoryAddressRepository.INSTANCE = new InMemoryAddressRepository();
    }
    return InMemoryAddressRepository.INSTANCE;
  }

  async create(data: Prisma.AddressUncheckedCreateInput): Promise<Address> {
    const {number = "",complement = "",latitude,longitude,locationId,orgId} = data;

    const address = {
      id: randomUUID(),
      locationId,
      orgId,
      number,
      complement,
      latitude: new Prisma.Decimal(latitude.toString()),
      longitude: new Prisma.Decimal(longitude.toString()),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    };
    this.address.push(address);

    return address;
  }
}