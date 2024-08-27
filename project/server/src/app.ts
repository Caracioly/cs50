import { FastifyInstance } from "fastify";

import { swagger } from "./plugins/swagger";
import { registerCors } from "./plugins/cors";

import { userStats } from "./routes/user-stats";
import { register } from "./routes/register";
import { logout } from "./routes/logout";
import { login } from "./routes/login";
import { auth } from "./routes/auth";

import { average } from "./routes/average";
import { ranking } from "./routes/ranking";
import { greet } from "./routes/greet";
import { vowel } from "./routes/vowel";
import { sum } from "./routes/sum";

export async function buildApp(app: FastifyInstance) {
  registerCors(app);

  await swagger(app);
  await userStats(app);
  await register(app);
  await average(app);
  await ranking(app);
  await logout(app);
  await login(app);
  await vowel(app);
  await greet(app);
  await auth(app);
  await sum(app);
}
