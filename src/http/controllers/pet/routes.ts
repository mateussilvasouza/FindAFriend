import { verifyJWT } from "@/http/middleware/verify-jwt";
import { FastifyInstance } from "fastify";
import { createPet } from "./create";
import { listPet } from "./list";
import { getContact } from "./contact";


export async function petRoutes(app:FastifyInstance){
  app.post("/pets",{onRequest: [verifyJWT]},createPet);
  app.get("/pets",listPet);
  app.get("/pets/:petId/contact",getContact);
}