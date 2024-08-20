import { FastifyInstance } from "fastify";
import { z } from "zod";
import { spawn } from "child_process";

import { prisma } from "../plugins/prisma";

export async function greet(app: FastifyInstance) {
  app.post("/greet", async (request, reply) => {
    const codeSchema = z.object({
      code: z.string(),
    });

    const testCases = [
      { in: "Andre", out: "hello, Andre" },
      { in: "David", out: "hello, David" },
      { in: "Brian", out: "hello, Brian" },
    ];

    const { code } = codeSchema.parse(request.body);

    const exercise = await prisma.exercises.findFirst({
      where: {
        name: "greet",
      }
    })

    

    function runPythonScript(code: string, input: string): Promise<string> {
      return new Promise((resolve, reject) => {
        const pythonProcess = spawn("python", [
          "-c",
          `
${code}

result = greet("${input}")
print(result)
`,
        ]);

        let data = "";
        pythonProcess.stdout.on("data", (chunk) => {
          data += chunk.toString();
        });

        pythonProcess.stderr.on("data", (error) => {
          console.error(`stderr: ${error}`);
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

      reply.send({ success: true, results });
    } catch (error) {
      reply.status(500).send({ success: false, error });
    }
  });
}
