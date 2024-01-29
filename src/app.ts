import fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "@fastify/jwt";
import env from "./env";
import { ZodError } from "zod";
import { orgRoutes } from "./http/controllers/org/routes";
import { petRoutes } from "./http/controllers/pet/routes";

const app = fastify({
  logger: true
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn:"10m"
  }
});
app.register(orgRoutes);
app.register(petRoutes);

app.get("/",async (request: FastifyRequest, reply: FastifyReply)=> reply.status(200).send("Servidor Executando"));
app.setErrorHandler((error, _,reply)=>{
  if(error instanceof ZodError){
    return reply.status(400).send({
      message: "Validation Error.",
      issues: error.format()
    });
  }

  if(env.NODE_ENV !== "production"){
    console.log(error);
  } else {
    // Todo
  }
});

export default app;