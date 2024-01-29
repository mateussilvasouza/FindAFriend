import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import app from "@/app";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

describe("List Pets(e2e)",()=>{
  beforeAll(()=>{
    app.ready();
  });

  afterAll(()=>{
    app.close();
  });

  it("should be able to list pets for city",async ()=>{
    
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

    const location = await prisma.location.create({
      data:{
        id: randomUUID(),
        address: "Estrada Raul Veiga",
        neighborhood: "Miriambi",
        city: "São Gonçalo",
        zipcode: "24730060",
        state: "RJ",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    });

    await prisma.address.create({
      data: {
        locationId: location.id,
        orgId: org.id,
        number: "2258",
        complement: "",
        latitude: -22.825687,
        longitude: -42.9903308
      }
    });

    await prisma.pet.create({
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
      .get("/pets")
      .query({
        city: "São Gonçalo"
      })
      .send();
    expect(response.status).toEqual(200);
    expect(response.body.pets).toHaveLength(1);
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: "Bob",
        description: "Pequeno, carinhoso e peludo.",
        age: "ADULTO",
        autonomy: "MEDIO",
        energy: "3",
        species: "CACHORRO",
        race: "Shitzu",
      })
    ]);
  });

  it("should be able to list pets for city and characterist",async ()=>{  
    const org = await prisma.org.create({
      data: {
        id: randomUUID(),
        name: "FindAFriend",
        alias: "FindAFriend",
        cnpj: "11111111112",
        password: "123456",
        phone: "11111111111",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    });

    const location = await prisma.location.create({
      data:{
        id: randomUUID(),
        address: "Estrada Raul Veiga",
        neighborhood: "Miriambi",
        city: "São Gonçalo",
        zipcode: "24730061",
        state: "RJ",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    });

    await prisma.address.create({
      data: {
        locationId: location.id,
        orgId: org.id,
        number: "2258",
        complement: "",
        latitude: -22.825687,
        longitude: -42.9903308
      }
    });

    await prisma.pet.create({
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

    await prisma.pet.create({
      data: {
        id: randomUUID(),
        name: "Bob",
        description: "Pequeno, carinhoso e peludo.",
        age: "ADULTO",
        autonomy: "MEDIO",
        energy: "3",
        species: "CACHORRO",
        race: "Pincher",
        orgId: org.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    });

    const response = await request(app.server)
      .get("/pets")
      .query({
        city: "São Gonçalo",
        race: "Pincher"
      })
      .send();
    expect(response.status).toEqual(200);
    expect(response.body.pets).toHaveLength(1);
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: "Bob",
        description: "Pequeno, carinhoso e peludo.",
        age: "ADULTO",
        autonomy: "MEDIO",
        energy: "3",
        species: "CACHORRO",
        race: "Pincher",
      })
    ]);
  });
});