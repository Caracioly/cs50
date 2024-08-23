import { FastifyInstance } from "fastify";
import { decodeToken } from "../plugins/jwt";
import { prisma } from "../plugins/prisma";

export async function userStats(app: FastifyInstance) {
  app.get("/user-stats", async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply.status(401).send({ message: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];

    const user = decodeToken(token);
    if (!user || typeof user !== "object" || !("id" in user)) {
      return reply.status(401).send({ message: "Invalid token" });
    }
    const userId = user.id;

    try {
      const exercises = await prisma.exercises.findMany({
        where: { userId },
        select: {
          chances: true,
          allTestsPassed: true,
        },
      });

      const scores = await prisma.scores.findFirst({
        where: { userId },
        select: {
          score: true,
        },
      });

      if (!exercises || !scores) {
        return reply.status(404).send({ message: "User stats not found" });
      }

      return reply.send({
        chances: exercises.map((exercise) => exercise.chances),
        score: scores.score,
        allTestspassed: exercises.map((exercise) => exercise.allTestsPassed),
      });
    } catch (error) {
      return reply.status(500).send({ error: "Something went wrong" });
    }
  });
}
