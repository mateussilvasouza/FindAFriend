import { InMemoryOrgRepository } from "@/repositories/in-memory/org-repository";
import {describe, it, expect, beforeEach} from "vitest";
import { OrgRepository } from "@/DTO/OrgRepository";
import { AuthenticateUseCase } from "../authenticate";
import { InvalidCredentialError } from "../errors/invalid-credential-error";


let orgRepository: OrgRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Org", ()=>{

  beforeEach(()=>{
    orgRepository = new InMemoryOrgRepository();
    sut = new AuthenticateUseCase(orgRepository);
  });

  it("should be able be possible to authenticate as an org", async ()=>{

    orgRepository.create({
      name: "FindAFriend",
      alias: "Encontre um amigo",
      cnpj: "11111111111111",
      phone: "11111111111",
      password: "123456"
    });

    const {org} = await sut.execute({
      cnpj: "11111111111111",
      password: "123455"
    });

    expect(org).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: "FindAFriend",
      alias: "Encontre um amigo",
      cnpj: "11111111111111",
      phone: "11111111111"
    }));
  });

  it("should be possible to authenticate with invalid credentials",async ()=>{
    await expect(async ()=>{
      await sut.execute({
        cnpj: "11111111111111",
        password: "123455"
      });
    }).rejects.toBeInstanceOf(InvalidCredentialError);
  });
});