
import { ResourceNotFoundError } from "@/use-cases/errors/resouce-not-found-error";
import { makeGetOrgContactUseCase } from "@/use-cases/factories/make-get-org-contact-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function getContact(request: FastifyRequest, reply: FastifyReply){
  try {
    const createParamsSchema = z.object({
      petId: z.string()
    });

    try{
      const {petId} = createParamsSchema.parse(request.params);
      const getContactUseCase = makeGetOrgContactUseCase();

      const {phone} = await getContactUseCase.execute(petId);
      
      reply.status(200).send({phone});
    } catch (error) {
      if(error instanceof ResourceNotFoundError){
        reply.status(404).send({message: error.message});
      }
      return error;
    }
  } catch (error) {
    reply.status(500).send();
  }
}