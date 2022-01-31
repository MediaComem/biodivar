import Hapi from "@hapi/hapi";
import hapiAuthCookie from "@hapi/cookie";
import { prismaPlugin } from "./plugins/prisma";
import { authPlugin } from "./plugins/auth";
import { authRoutes } from "./router/auth-route";
import { userRoutes } from "./router/user-route";
import { bioversRoutes } from "./router/biovers-route";
import { poiRoutes } from "./router/poi-route";
import { pathRoutes } from "./router/path-route";
import { winstonPlugin } from "./plugins/winston";

const server: Hapi.Server = Hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || "localhost",
  routes: {
    cors: {
      origin: ['*'],
      credentials: true,
    },
  }
});

export async function init(): Promise<Hapi.Server> {
  await server.register([
    winstonPlugin,
    prismaPlugin,
    hapiAuthCookie,
    authPlugin,
  ]);

  server.route(authRoutes);
  server.route(userRoutes);
  server.route(bioversRoutes);
  server.route(poiRoutes);
  server.route(pathRoutes);

  return server;
}

process.on("unhandledRejection", async (err) => {
  await server.app.prisma.$disconnect();
  server.app.logger.error(err);
  process.exit(1);
});

export const start = async function (): Promise<void> {
  server.app.logger.info(`Server ready at: ${server.info.uri}`);
  return server.start();
};
