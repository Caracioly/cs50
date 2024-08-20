import { FastifyInstance } from "fastify";
import { z } from "zod";

import { prisma } from "../plugins/prisma";
import { hashPassword } from "../plugins/bcrypt";

export async function register(app: FastifyInstance) {
  app.post("/users", async (request, reply) => {
    const createUserSchema = z.object({
      name: z.string().min(3),
      password: z.string(),
      age: z.number().min(5).max(120).int().positive(),
    });

    const { name, password, age } = createUserSchema.parse(request.body);

    const userExists = await prisma.users.findUnique({
      where: {
        name,
      },
    });

    if (userExists) {
      return reply.status(400).send({
        message: "Name already taken",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.users.create({
      data: {
        name,
        password: hashedPassword,
        age,
      },
    });

    return reply.status(201).send({
      action: "User created",
      userId: user.id,
    });
  });
}
