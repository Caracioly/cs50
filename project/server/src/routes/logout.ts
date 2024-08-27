import { FastifyInstance } from "fastify";
import { isValidToken } from "../plugins/jwt";

export async function logout(app: FastifyInstance) {
  app.post("/logout", async (request, reply) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return reply.status(401).send({
        message: "No token provided",
      });
    }

    if (!isValidToken(authHeader)) {
      return reply.status(401).send({
        message: "Invalid token",
      });
    }

    return reply.status(200).send({
      action: "Logged out",
    });
  });
}
