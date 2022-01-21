import Hapi from "@hapi/hapi";
import hapiAuthCookie from "@hapi/cookie";
import { prismaPlugin } from "./plugins/prisma";
import { authPlugin } from "./plugins/auth";
import { authRoutes } from "./router/auth-route";
import { bioversRoutes } from "./router/biovers-route";

const server: Hapi.Server = Hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || "localhost",
});

export async function init(): Promise<Hapi.Server> {
  await server.register([
    prismaPlugin,
    hapiAuthCookie,
    authPlugin,
  ]);

  server.route(authRoutes);
  server.route(bioversRoutes);
  
  return server;
}

process.on("unhandledRejection", async (err) => {
  await server.app.prisma.$disconnect();
  console.log(err);
  process.exit(1);
});

export const start = async function (): Promise<void> {
    console.log(`Server ready at: ${server.info.uri}`);
    return server.start();
};
