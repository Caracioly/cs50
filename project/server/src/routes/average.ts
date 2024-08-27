import { FastifyInstance } from "fastify";
import { z } from "zod";
import { spawn } from "child_process";
import { prisma } from "../plugins/prisma";
import { decodeToken } from "../plugins/jwt";

export async function average(app: FastifyInstance) {
  app.post("/average", async (request, reply) => {
    const codeSchema = z.object({
      code: z.string(),
      token: z.string(),
    });

    const testCases = [
      { in: [2, 4, 6], out: "4" },
      { in: [1, 1, 1, 1], out: "1" },
      { in: [-1, 1, -1, 1], out: "0" },
    ];

    const { code, token } = codeSchema.parse(request.body);

    const user = decodeToken(token);
    if (!user || typeof user !== "object" || !("id" in user)) {
      return reply.status(401).send({ message: "Invalid token" });
    }
    const userId = user.id;

    const exercise = await prisma.exercises.findFirst({
      where: {
        userId: user.id,
        name: "average",
      },
    });

    if (!exercise) {
      return reply.status(404).send({ success: false, error: "Exercise not found for this user" });
    }

    if (exercise.chances <= 0) {
      return reply.status(400).send({ success: false, error: "No chances remaining" });
    }

    await prisma.exercises.update({
      where: {
        id: exercise.id,
      },
      data: {
        chances: {
          decrement: 1,
        },
      },
    });

    function runPythonScript(code: string, inputs: Array<number>): Promise<string> {
      return new Promise((resolve, reject) => {
        const list = JSON.stringify(inputs);

        const pythonProcess = spawn("python", [
          "-c",
          `
${code}

result = average(${list})
print(int(result))
`,
        ]);

        let data = "";
        pythonProcess.stdout.on("data", (chunk) => {
          data += chunk.toString();
        });

        pythonProcess.stderr.on("data", (error) => {
          reject(`stderr: ${error.toString()}`);
        });

        pythonProcess.on("close", (code) => {
          if (code !== 0) {
            reject(`Error: Script exited with code ${code}`);
          } else {
            resolve(data.trim());
          }
        });
      });
    }

    try {
      const results = await Promise.all(
        testCases.map(async (test) => {
          const result = await runPythonScript(code, test.in);
          return {
            input: test.in,
            expected: test.out,
            result,
            passed: result === test.out,
          };
        })
      );

      const allTestsPassed = results.every((test) => test.passed);

      if (allTestsPassed && !exercise.allTestsPassed) {
        const scoreIncrement = 1 + exercise.chances;

        const scores = await prisma.scores.findFirst({
          where: {
            userId,
          },
        });

        if (scores) {
          await prisma.scores.update({
            where: {
              id: scores.id,
            },
            data: {
              score: {
                increment: scoreIncrement,
              },
            },
          });
        }

        await prisma.exercises.update({
          where: {
            id: exercise.id,
          },
          data: {
            allTestsPassed: true,
          },
        });
      }

      reply.status(200).send({ success: true, results });
    } catch (error) {
      console.error(error);
      reply.status(500).send({ success: false, error: "An error occurred while processing your request." });
    }
  });
}
