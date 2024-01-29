import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["production","development","test"]).default("development"),
  PORT: z.coerce.number().default(8000),
  JWT_SECRET: z.string()
});

const _env = envSchema.safeParse(process.env);

if(!_env.success){
  console.error("Invalid environment variables, check the errors below!", _env.error.format());
  throw new Error("Invalid environment variables, check the errors below!");
}

const env = _env.data;

export default env;