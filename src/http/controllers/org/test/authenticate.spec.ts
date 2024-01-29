import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import app from "@/app";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

describe("Authenticate Org(e2e)",()=>{
  beforeAll(()=>{
    app.ready();
  });

  afterAll(()=>{
    app.close();
  });

  it("should be able to authenticate org",async ()=>{
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
    
    const response = await request(app.server)
      .post("/authenticate")
      .send({
        cnpj: "11111111111",
        password: "123456"
      });
    expect(response.status).toEqual(200);
    expect(response.body.token).toEqual(expect.any(String));
  });
});