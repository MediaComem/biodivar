import { ServerRoute } from "@hapi/hapi";

import { createPoi, deletePoi, updatePoi } from "../controller/poi-controller";
import { PoiModel } from "../types/poi-model";

export const poiRoutes: ServerRoute[] = [];

poiRoutes.push({
  method: "POST",
  path: "/poi/create",
  handler: function (request, h) {
    return createPoi(
      request.server.app.prisma,
      JSON.parse(request.query.poi) as PoiModel
    );
  },
});

poiRoutes.push({
  method: "POST",
  path: "/poi/update",
  handler: function (request, h) {
    return updatePoi(
      request.server.app.prisma,
      JSON.parse(request.query.poi) as PoiModel
    );
  },
});

poiRoutes.push({
  method: "POST",
  path: "/poi/delete",
  handler: function (request, h) {
    return deletePoi(request.server.app.prisma, +request.query.id);
  },
});
