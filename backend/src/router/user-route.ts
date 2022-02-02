import { ServerRoute } from "@hapi/hapi";

import {
  deleteUser,
  updateUser,
} from "../controller/users-controller";
import { UserModel } from "../types/user-model";

export const userRoutes: ServerRoute[] = [];

userRoutes.push({
  method: "POST",
  path: "/user/update",
  handler: function (request, h) {
    return updateUser(
      request.server.app.prisma,
      request.payload as UserModel,
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
      request.payload as UserModel,
      request.server.app.logger
    );
  },
});
