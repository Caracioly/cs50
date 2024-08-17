import { FastifyInstance } from "fastify";

import { registerCors } from "./plugins/cors";
import { registerSwagger } from "./plugins/swagger";

import { createUser } from "./routes/create-user";
import { loginAuth } from "./routes/login-auth";

export async function buildApp(app: FastifyInstance) {
  await registerCors(app);
  await registerSwagger(app);

  await createUser(app);
  await loginAuth(app)
}
