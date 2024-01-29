import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";
import { makeCreateOrgUseCase } from "@/use-cases/factories/make-create-org-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function createOrg(request: FastifyRequest, reply: FastifyReply){
  try {
    const createBodySchema = z.object({
      name: z.string(),
      alias: z.string().nullable(),
      cnpj: z.string(),
      password: z.string(),
      phone: z.string(),
      address: z.object({
        address: z.string(),
        number: z.string().nullable(),
        complement: z.string().nullable(),
        neighborhood: z.string(),
        city: z.string(),
        zipcode: z.string().length(8),
        state: z.string().length(2),
        latitude: z.coerce.number().refine(value => {
          return Math.abs(value) <= 90;
        }),
        longitude: z.coerce.number().refine(value => {
          return Math.abs(value) <= 180;
        }),
      })
    });

    try{
      const {name, cnpj, password, phone, alias = "", address: addressObject} = createBodySchema.parse(request.body);
      const {address: orgAddress, neighborhood, city, zipcode, state, complement = "",latitude,longitude,number = ""} = addressObject;

      const org = {name,cnpj,password,phone,alias};
      const location = {address: orgAddress,neighborhood,city,state,zipcode};
      const address = {number,complement,latitude,longitude};

      const createUseCase = makeCreateOrgUseCase();
      const {organization} = await createUseCase.execute({org,location,address});

      reply.status(201).send({organization});
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