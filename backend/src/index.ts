import Hapi from "@hapi/hapi";
import hapiAuthCookie from "@hapi/cookie";
import { prismaPlugin } from "./plugins/prisma";
import { usersPlugin } from "./plugins/users";
import { authPlugin } from "./plugins/auth";
import { authRoutes } from "./router/auth-route";

const server: Hapi.Server = Hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || "localhost",
});

export async function start(): Promise<Hapi.Server> {
  await server.register([
    prismaPlugin,
    usersPlugin,
    hapiAuthCookie,
    authPlugin,
  ]);

  server.route(authRoutes);

  await server.start();
  return server;
}

process.on("unhandledRejection", async (err) => {
  await server.app.prisma.$disconnect();
  console.log(err);
  process.exit(1);
});

start()
  .then((server) => {
    console.log(`Server ready at: ${server.info.uri}`);
  })
  .catch((err) => {
    console.log(err);
  });
