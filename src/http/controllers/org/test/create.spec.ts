import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import app from "@/app";

describe("Create Org(e2e)",()=>{
  beforeAll(()=>{
    app.ready();
  });

  afterAll(()=>{
    app.close();
  });

  it("should be able to create org",async ()=>{
    const response = await request(app.server)
      .post("/org")
      .send({
        name: "FindAFriend",
        alias: "FindAFriend",
        cnpj: "11111111111",
        password: "123456",
        phone: "11111111111",
        address: {
          address: "Estrada Raul Veiga",
          number: "2258",
          complement: "",
          neighborhood: "Miriambi",
          city: "São Gonçalo",
          zipcode: "24730060",
          state: "RJ",
          latitude: -22.825687,
          longitude: -42.9903308
        }
      });

    expect(response.status).toEqual(201);
  });
});