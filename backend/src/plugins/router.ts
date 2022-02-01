import { Plugin, Server, RouteOptions } from '@hapi/hapi';

import { authRoutes } from '../router/auth-route';
import { userRoutes } from '../router/user-route';
import { bioversRoutes } from '../router/biovers-route';
import { poiRoutes } from '../router/poi-route';
import { pathRoutes } from '../router/path-route';

export const routerPlugin: Plugin<null> = {
  name: 'router',
  register: async function (server: Server) {
    server.route(authRoutes);
    server.route(userRoutes);
    server.route(bioversRoutes);
    server.route(poiRoutes);
    server.route(pathRoutes);

    server.route({
      method: '*',
      path: '/{any*}',
      handler: function (request, h) {
        return '404 Error! Page Not Found!';
      },
    });
  },
};
