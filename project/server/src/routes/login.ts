import { FastifyInstance } from "fastify";
import { z } from "zod";

import { comparePassword } from "../plugins/bcrypt";
import { generateToken } from "../plugins/jwt";
import { prisma } from "../plugins/prisma";

export async function login(app: FastifyInstance) {
  app.post("/login", async (request, reply) => {
    const createUserSchema = z.object({
      name: z.string().min(3),
      password: z.string(),
    });

    const { name, password } = createUserSchema.parse(request.body);

    const user = await prisma.users.findUnique({
      where: {
        name,
      },
    });

    if (!user || !(await comparePassword(password, user.password))) {
      return reply.status(401).send({
        message: "Invalid name or Password",
      });
    }

    const token = generateToken(user.id);

    return reply.status(200).send({
      action: "Logged in",
      token,
    });
  });
}
