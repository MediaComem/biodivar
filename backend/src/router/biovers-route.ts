import { ServerRoute } from "@hapi/hapi";

import {
  createBiovers,
  deleteBiovers,
  getBioversByUser,
  getPublicBiovers,
  updateBiovers,
} from "../controller/biovers-controller";
import { BioversModel } from "../types/biovers-model";

export const bioversRoutes: ServerRoute[] = [];

bioversRoutes.push({
  method: "GET",
  path: "/biovers",
  handler: function (request, h) {
    return getPublicBiovers(request.server.app.prisma);
  },
});

bioversRoutes.push({
  method: "GET",
  path: "/biovers/user",
  handler: function (request, h) {
    return getBioversByUser(request.server.app.prisma, +request.query.id);
  },
});

bioversRoutes.push({
  method: "POST",
  path: "/biovers/create",
  handler: function (request, h) {
    return createBiovers(
      request.server.app.prisma,
      request.payload as BioversModel,
      request.server.app.logger
    );
  },
});

bioversRoutes.push({
  method: "POST",
  path: "/biovers/update",
  handler: function (request, h) {
    return updateBiovers(
      request.server.app.prisma,
      request.payload as BioversModel,
      request.server.app.logger
    );
  },
});

bioversRoutes.push({
  method: "POST",
  path: "/biovers/delete",
  handler: function (request, h) {
    return deleteBiovers(
      request.server.app.prisma,
      request.payload as BioversModel,
      request.server.app.logger
    );
  },
});
