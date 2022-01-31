import { ServerRoute } from "@hapi/hapi";

import { createPath, deletePath, updatePath } from "../controller/path-controller";
import { PathModel } from "../types/path-model";

export const pathRoutes: ServerRoute[] = [];

pathRoutes.push({
  method: "POST",
  path: "/path/create",
  handler: function (request, h) {
    return createPath(
      request.server.app.prisma,
      request.payload as PathModel,
      request.server.app.logger
    );
  },
});

pathRoutes.push({
  method: "POST",
  path: "/path/update",
  handler: function (request, h) {
    return updatePath(
      request.server.app.prisma,
      request.payload as PathModel,
      request.server.app.logger
    );
  },
});

pathRoutes.push({
  method: "POST",
  path: "/path/delete",
  handler: function (request, h) {
    return deletePath(
      request.server.app.prisma,
      request.payload as PathModel,
      request.server.app.logger
    );
  },
});
