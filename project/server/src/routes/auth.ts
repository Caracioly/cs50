import { FastifyInstance } from "fastify";
import { z } from "zod";
import { isValidToken } from "../plugins/jwt";

export async function auth(app: FastifyInstance) {
  app.post("/auth", async (request, reply) => {
    const authSchema = z.object({
      token: z.string(),
    });

    const { token } = authSchema.parse(request.body);

    const isValid = isValidToken(token);

    if (!isValid) {
      return reply.status(401).send({ valid: false });
    }

    return reply.status(200).send({ valid: true });
  });
}
