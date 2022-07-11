import { Plugin, Server } from '@hapi/hapi';

import { authRoutes } from '../router/auth-route';
import { userRoutes } from '../router/user-route';
import { bioversRoutes } from '../router/biovers-route';
import { poiRoutes } from '../router/poi-route';
import { pathRoutes } from '../router/path-route';
import { userTraceRoutes } from '../router/user_trace-route';
import { symbolRoutes } from '../router/symbol-route';
import { mediaRoutes } from '../router/media-route';
import { eventRoutes } from '../router/event-route';

import { NotFoundResponse } from '../utils/response';

export const routerPlugin: Plugin<null> = {
  name: 'router',
  register: async function (server: Server) {
    server.route(authRoutes);
    server.route(userRoutes);
    server.route(bioversRoutes);
    server.route(poiRoutes);
    server.route(pathRoutes);
    server.route(userTraceRoutes);
    server.route(symbolRoutes);
    server.route(mediaRoutes);
    server.route(eventRoutes);

    server.route({
      method: '*',
      path: '/{any*}',
      options: {
        auth: {
          mode: 'try',
        },
        handler: function (request, h) {
          return NotFoundResponse(h, '404 Error! Page Not Found!');
        },
      }
    });
  },
};
