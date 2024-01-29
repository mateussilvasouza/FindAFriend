import { OrgRepository } from "@/DTO/OrgRepository";
import { InvalidCredentialError } from "./errors/invalid-credential-error";
import bcrypt from "bcrypt";

interface AuthenticateRequestUseCase{
    cnpj: string,
    password: string
}

export class AuthenticateUseCase{
  constructor(private orgRepository: OrgRepository){}

  async execute({cnpj,password}:AuthenticateRequestUseCase){
    const org = await this.orgRepository.findByCnpj(cnpj);

    if(!org){
      throw new InvalidCredentialError();
    }

    const resultComparePassword = bcrypt.compare(org.password, password);

    if(!resultComparePassword){
      throw new InvalidCredentialError();
    }

    return {
      org
    };
  }
}