import Hapi from '@hapi/hapi';
import hapiAuthCookie from '@hapi/cookie';
import { prismaPlugin } from './plugins/prisma';
import { authPlugin } from './plugins/auth';
import { winstonPlugin } from './plugins/winston';
import { routerPlugin } from './plugins/router';

const server: Hapi.Server = Hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  routes: {
    cors: {
      origin: ['*'],
      credentials: true,
    },
  },
});

export async function init(): Promise<Hapi.Server> {
  await server.register([
    winstonPlugin,
    prismaPlugin,
    hapiAuthCookie,
    authPlugin,
    routerPlugin,
  ], {
    routes: {
      prefix: process.env.URL_PREFIX || '/api',
    }
  });

  return server;
}

process.on('unhandledRejection', async (err) => {
  await server.app.prisma.$disconnect();
  server.app.logger.error(err);
  process.exit(1);
});

export const start = async function (): Promise<void> {
  server.app.logger.info(`Server ready at: ${server.info.uri}`);
  return server.start();
};
