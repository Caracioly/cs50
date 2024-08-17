import { FastifyInstance } from "fastify";
import { z } from "zod";

import { prisma } from "../plugins/prisma";
import { comparePassword } from "../plugins/bcrypt";

export async function loginAuth(app: FastifyInstance) {
  app.post("/login", async (request, reply) => {
    const createUserSchema = z.object({
      name: z.string().min(3),
      password: z.string(),
    })
    
    const {name, password} = createUserSchema.parse(request.body);
    
    const user = await prisma.users.findUnique({
        where: {
          name,
        },
      });

      if (!user || !await comparePassword(password, user.password)) {
        return reply.status(400).send({
          message: "Invalid name or Password",
        });
      }
      
      return reply.status(200).send({
        action: "Logged in",
        token: "some token here",
      });
    }
  );
}

