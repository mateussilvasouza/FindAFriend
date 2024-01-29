import { Address } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export const addressesSeeds = [
  {
    id: "1",
    locationId: "1",
    orgId: "2b45e043-624a-44b2-a0db-cd33d34c6669",
    number: "22",
    complement: "Vila das Flores",
    latitude: new Decimal(-22.8204675),
    longitude: new Decimal(-43.0122228),
    createdAt: new Date("2022-06-14T15:12:06.207Z"),
    updatedAt: new Date("2022-06-14T15:12:06.207Z"),
    deletedAt: null,
  },
  {
    id: "2",
    locationId: "2",
    orgId: "8bdf0f29-a87d-4531-8e44-3797eefdf559",
    number: "22",
    complement: "Vila das Flores",
    latitude: new Decimal(-22.8204675),
    longitude: new Decimal(-43.0122228),
    createdAt: new Date("2022-06-14T15:12:06.207Z"),
    updatedAt: new Date("2022-06-14T15:12:06.207Z"),
    deletedAt: null,
  },
] as Address[];
