import { InvalidCredentialError } from "@/use-cases/errors/invalid-credential-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply){
  try {
    const createBodySchema = z.object({
      cnpj: z.string(),
      password: z.string()
    });

    try{
      const {cnpj, password} = createBodySchema.parse(request.body);

      const authenticateUseCase = makeAuthenticateUseCase();

      const {org} = await authenticateUseCase.execute({cnpj,password});

      const token = await reply.jwtSign({},
        {
          sign:{
            sub: org.id
          }
        });

      reply.status(200).send({token});
    } catch (error) {
      if(error instanceof InvalidCredentialError){
        reply.status(401).send({message: error.message});
      }
      return error;
    }
  } catch (error) {
    reply.status(500).send();
  }
}