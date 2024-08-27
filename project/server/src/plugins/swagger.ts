import { jsonSchemaTransform } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import * as schemas from "../schemas/schemas";

export async function swagger(app: FastifyInstance) {
  const paths = {
    "/login": schemas.loginSchema,
    "/register": schemas.registerSchema,
    "/auth": schemas.authSchema,
    "/logout": schemas.logoutSchema,
    "/ranking": schemas.rankingSchema,
    "/user-stats": schemas.userStatsSchema,
    "/greet": schemas.greetSchema,
    "/sum": schemas.sumSchema,
    "/average": schemas.averageSchema,
    "/vowel": schemas.vowelSchema,
  };

  app.register(fastifySwagger, {
    swagger: {
      consumes: ["application/json"],
      produces: ["application/json"],
      info: {
        title: "Andre Caracioly Project",
        description: "API for CS50 final project",
        version: "1.0.0",
      },
      externalDocs: {
        url: "https://github.com/Caracioly/cs50/tree/main/project",
      },
      paths,
    },
    transform: jsonSchemaTransform,
  });

  app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
  });
}
