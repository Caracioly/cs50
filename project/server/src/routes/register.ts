import { FastifyInstance } from "fastify";
import { z } from "zod";

import { prisma } from "../plugins/prisma";
import { hashPassword } from "../plugins/bcrypt";

export async function register(app: FastifyInstance) {
  app.post("/register", async (request, reply) => {
    const createUserSchema = z.object({
      name: z.string().min(3),
      password: z.string(),
      confirm: z.string(),
      age: z.number().min(5).max(120).int().positive(),
    });

    const { name, password, confirm, age } = createUserSchema.parse(
      request.body
    );

    const userExists = await prisma.users.findUnique({
      where: {
        name,
      },
    });

    if (userExists) {
      return reply.status(400).send({
        success: false,
        error: "Name already taken",
      });
    }

    if (password !== confirm) {
      return reply.status(400).send({
        success: false,
        error: "Confirmation password does not match",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.users.create({
      data: {
        name,
        password: hashedPassword,
        age,
        exercises: {
          create: [
            {
              name: "greet",
            },
            {
              name: "sum",
            },
            {
              name: "average",
            },
            {
              name: "vowel",
            },
          ],
        },
        scores: {
          create: {
            score: 0,
          },
        },
      },
    });

    return reply.status(201).send({
      action: "User created",
      userId: user.id,
    });
  });
}
