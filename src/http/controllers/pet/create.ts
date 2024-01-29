
import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";
import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function createPet(request: FastifyRequest, reply: FastifyReply){
  try {
    const createBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      age: z.enum(["FILHOTE","ADULTO","SENIOR"]),
      autonomy: z.enum(["ALTO","MEDIO","BAIXO"]),
      energy: z.enum(["1","2","3","4","5"]),
      species:z.enum(["CACHORRO","GATO","PASSARO"]),
      race: z.string()
    });

    try{
      const {name,species,race,description,age,energy,autonomy} = createBodySchema.parse(request.body);

      const createPetUseCase = makeCreatePetUseCase();

      const {pet} = await createPetUseCase.execute({
        name,
        species,
        race,
        description,
        age,
        energy,
        autonomy,
        orgId: request.user.sub
      });

      reply.status(201).send({pet});
    } catch (error) {
      if(error instanceof OrgAlreadyExistsError){
        reply.status(400).send({message: error.message});
      }
      return error;
    }
  } catch (error) {
    reply.status(500).send();
  }
}