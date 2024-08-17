import { FastifyInstance } from "fastify";
import fastifyCors from "@fastify/cors";

export async function registerCors(app: FastifyInstance) {
  app.register(fastifyCors, {
    origin: "*", // permite todas as origens
  });
}
