import { ServerRoute } from "@hapi/hapi";
import { User } from "@prisma/client";
import Joi from 'joi';

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
  options: {
    validate: {
      payload: Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
      }),
    },
    handler: async function (request, h) {
      try {
        const account = await createUser(
          request.server.app.prisma,
          request.payload as UserModel,
          request.server.app.logger
        ) as User;
        request.cookieAuth.set({ id: account.id });
        return account;
      } catch(error) {
        let errorMessage: string = '';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        else {
          errorMessage = 'The user cannot be create for unknow reason. Please contact an administator to solve the problem';
        }
        return h.response({
          errorMessage: errorMessage,
        }).code(400);
      }
        
    },
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
