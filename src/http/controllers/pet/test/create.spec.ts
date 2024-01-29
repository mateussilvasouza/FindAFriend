import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import app from "@/app";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

describe("Create Pet(e2e)",()=>{
  beforeAll(()=>{
    app.ready();
  });

  afterAll(()=>{
    app.close();
  });

  it("should be able to create pet",async ()=>{
    await prisma.org.create({
      data: {
        id: randomUUID(),
        name: "FindAFriend",
        alias: "FindAFriend",
        cnpj: "11111111111",
        password: "123456",
        phone: "11111111111",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      }
    });

    const login = await request(app.server)
      .post("/authenticate")
      .send({
        cnpj: "11111111111",
        password: "123456"
      });

    const {token} = login.body;

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization",`Bearer ${token}`)
      .send({
        name: "Bob",
        description: "Pequeno, carinhoso e peludo.",
        age: "ADULTO",
        autonomy: "MEDIO",
        energy: "3",
        species: "CACHORRO",
        race: "Shitzu"
      });

    const {pet} = response.body;
    expect(response.status).toEqual(201);
    expect(pet).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: "Bob",
      description: "Pequeno, carinhoso e peludo.",
      age: "ADULTO",
      autonomy: "MEDIO",
      energy: "3",
      species: "CACHORRO",
      race: "Shitzu",
      orgId: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      deletedAt: null
    }));
  });
});