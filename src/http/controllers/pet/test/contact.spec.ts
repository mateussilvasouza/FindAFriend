import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import app from "@/app";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

describe("Contact(e2e)",()=>{
  beforeAll(()=>{
    app.ready();
  });

  afterAll(()=>{
    app.close();
  });

  it("should be able to get the contact number of the organization responsible for the pet",async ()=>{
    const org = await prisma.org.create({
      data: {
        id: randomUUID(),
        name: "FindAFriend",
        alias: "FindAFriend",
        cnpj: "11111111111",
        password: "123456",
        phone: "11111111111",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    });

    const pet = await prisma.pet.create({
      data: {
        id: randomUUID(),
        name: "Bob",
        description: "Pequeno, carinhoso e peludo.",
        age: "ADULTO",
        autonomy: "MEDIO",
        energy: "3",
        species: "CACHORRO",
        race: "Shitzu",
        orgId: org.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    });

    const response = await request(app.server)
      .get(`/pets/${pet.id}/contact`)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body.phone).toEqual(expect.objectContaining({phone: "11111111111"}));
  });
});