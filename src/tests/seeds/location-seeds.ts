import { Location } from "@prisma/client";

export const locationSeed = [
  {
    id: "1",
    address: "Rua A",
    neighborhood: "Higienopolis",
    city: "Rio de Janeiro",
    state: "RJ",
    zipcode: "21050730",
    createdAt: new Date("2022-06-14T15:12:06.207Z"),
    updatedAt: new Date("2022-06-14T15:12:06.207Z"),
    deletedAt: null
  },
  {
    id: "2",
    address: "Rua B",
    neighborhood: "Higienopolis",
    city: "São Paulo",
    state: "SP",
    zipcode: "21050731",
    createdAt: new Date("2022-06-14T15:12:06.207Z"),
    updatedAt: new Date("2022-06-14T15:12:06.207Z"),
    deletedAt: null
  },
] as Location[];