import { FastifyInstance } from "fastify";

import { registerCors } from "./plugins/cors";
import { registerSwagger } from "./plugins/swagger";

import { register } from "./routes/register";
import { login } from "./routes/login";
import { logout } from "./routes/logout";
import { auth } from "./routes/auth";
import { greet } from "./routes/greet";

export async function buildApp(app: FastifyInstance) {
  await registerCors(app);
  await registerSwagger(app);

  await register(app);
  await login(app);
  await logout(app);
  await auth(app)
  await greet(app)
}
