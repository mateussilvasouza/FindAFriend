import { FastifyInstance } from "fastify";
import { createOrg } from "./create";
import { authenticate } from "./authenticate";

export async function orgRoutes(app: FastifyInstance){
  app.post("/org",createOrg);
  app.post("/authenticate",authenticate);
}