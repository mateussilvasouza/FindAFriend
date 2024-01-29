import { Org } from "@prisma/client";

export const orgSeeds = [
  {
    id: "2b45e043-624a-44b2-a0db-cd33d34c6669",
    name: "FindAFriend",
    alias: "Encontre um amigo",
    cnpj: "11111111111122",
    phone: "11111111111",
    password: "123456",
    createdAt: new Date("2022-06-14T15:12:06.207Z"),
    updatedAt: new Date("2022-06-14T15:12:06.207Z"),
    deletedAt: null
  },
  {
    id: "8bdf0f29-a87d-4531-8e44-3797eefdf559",
    name: "FindAPet",
    alias: "Encontre um Pet",
    cnpj: "11111111111133",
    phone: "22222222222",
    password: "123456",
    createdAt: new Date("2022-06-14T15:12:06.207Z"),
    updatedAt: new Date("2022-06-14T15:12:06.207Z"),
    deletedAt: null
  }
] as Org[];