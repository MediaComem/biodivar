import { ServerRoute } from "@hapi/hapi";

import {
  createUser,
  deleteUser,
  updateUser,
} from "../controller/users-controller";
import { UserModel } from "../types/user-model";

export const userRoutes: ServerRoute[] = [];

userRoutes.push({
  method: "POST",
  path: "/user/create",
  handler: function (request, h) {
    return createUser(
      request.server.app.prisma,
      request.payload as UserModel,
      request.server.app.logger
    );
  },
  options: {
    auth: {
      mode: "try",
    },
  },
});

userRoutes.push({
  method: "POST",
  path: "/user/update",
  handler: function (request, h) {
    return updateUser(
      request.server.app.prisma,
      JSON.parse(request.query.user) as UserModel,
      request.server.app.logger
    );
  },
});

userRoutes.push({
  method: "POST",
  path: "/user/delete",
  handler: function (request, h) {
    return deleteUser(
      request.server.app.prisma,
      +request.query.id,
      request.server.app.logger
    );
  },
});
