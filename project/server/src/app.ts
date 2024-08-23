import { FastifyInstance } from "fastify";

import { registerCors } from "./plugins/cors";
import { registerSwagger } from "./plugins/swagger";

import { userStats } from "./routes/user-stats";
import { register } from "./routes/register";
import { logout } from "./routes/logout";
import { login } from "./routes/login";
import { auth } from "./routes/auth";

import { greet } from "./routes/greet";
import { sum } from "./routes/sum";
import { ranking } from "./routes/ranking";

export async function buildApp(app: FastifyInstance) {
  await registerCors(app);
  await registerSwagger(app);

  await register(app);
  await login(app);
  await logout(app);
  await auth(app);
  await greet(app);
  await userStats(app);
  await sum(app);
  await ranking(app);
}
