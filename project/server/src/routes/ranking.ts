import { FastifyInstance } from "fastify";
import { decodeToken } from "../plugins/jwt";
import { prisma } from "../plugins/prisma";

export async function ranking(app: FastifyInstance) {
  app.get("/ranking", async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply.status(401).send({ message: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];
    const user = decodeToken(token);

    if (!user || typeof user !== "object" || !("id" in user)) {
      return reply.status(401).send({ message: "Invalid token" });
    }

    try {
      const usersRanking = await prisma.users.findMany({
        select: {
          name: true,
          age:true,
          scores: {
            select: {
              score: true,
            },
            orderBy: {
              score: "desc",
            },
          },
        },
      });

      return reply.status(200).send(usersRanking);
    } catch (error) {
      return reply.status(500).send({ error: "Something went wrong" });
    }
  });
}
