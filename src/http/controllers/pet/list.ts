
import { ResourceNotFoundError } from "@/use-cases/errors/resouce-not-found-error";
import { makeListPetsUseCase } from "@/use-cases/factories/make-list-pets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function listPet(request: FastifyRequest, reply: FastifyReply){
  try {
    const createQuerySchema = z.object({
      city: z.string(),
      age: z.enum(["FILHOTE","ADULTO","SENIOR",""]).default(""),
      autonomy: z.enum(["ALTO","MEDIO","BAIXO",""]).default(""),
      energy: z.enum(["1","2","3","4","5",""]).default(""),
      species:z.enum(["CACHORRO","GATO","PASSARO",""]).default(""),  
      race: z.string().default("")
    });

    try{
      const {city, age, energy, race, species, autonomy} = createQuerySchema.parse(request.query);

      const listPetsUseCase = makeListPetsUseCase();

      const {pets} = await listPetsUseCase.execute(city, {age, energy, race, species, autonomy});

      reply.status(200).send({pets});
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