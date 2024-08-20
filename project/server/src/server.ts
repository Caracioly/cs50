import fastify from "fastify";

import { buildApp } from "./app";

async function init() {
  const app = fastify();

  await buildApp(app);

  return app;
}

init()
  .then((app) => {
    app.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
      if (err) {
        console.error("Error starting server:", err);
        process.exit(1);
      }
      console.log(`Server running on port ${address}`);
    });
  })
  .catch((err) => {
    console.error("Error during app initialization:", err);
    process.exit(1);
  });
