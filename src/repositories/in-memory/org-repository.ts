import { OrgRepository } from "@/DTO/OrgRepository";
import { Org, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

export class InMemoryOrgRepository implements OrgRepository{
  public orgs: Org[] = [];

  private static INSTANCE: InMemoryOrgRepository;

  public static getInstante(): InMemoryOrgRepository{
    if(!InMemoryOrgRepository.INSTANCE){
      InMemoryOrgRepository.INSTANCE = new InMemoryOrgRepository();
    }
    return InMemoryOrgRepository.INSTANCE;
  }

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const { name, cnpj, password, phone, alias = name} = data;
    const org = {
      id: randomUUID(),
      name,
      alias,
      cnpj,
      password,
      phone,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    };

    this.orgs.push(org);

    return org;
  }

  async findById(data: string): Promise<Org | null> {
    const org = this.orgs.find(org => org.id === data);

    if(!org){
      return null;
    }

    return org;
  }

  async findByCnpj(data: string): Promise<Org | null> {
    const org = this.orgs.find(org => org.cnpj === data);

    if(!org){
      return null;
    }

    return org;
  }
}