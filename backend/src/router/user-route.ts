import { ServerRoute } from '@hapi/hapi';

import { deleteUser, updateUser } from '../controller/users-controller';
import { UserModel } from '../types/user-model';

import { failureResponse, successResponse, errorResponse } from '../utils/response';

export const userRoutes: ServerRoute[] = [];

userRoutes.push({
  method: 'POST',
  path: '/user/update',
  handler: async function (request, h) {
    try {
      const user = await updateUser(
        request.server.app.prisma,
        request.payload as UserModel,
        request.server.app.logger
      );
      if (user) {
        return successResponse(h, 'User update done successfully', user);
      } else {
        return failureResponse(h, 'Mandatory fields are not provided');
      }
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});

userRoutes.push({
  method: 'POST',
  path: '/user/delete',
  handler: async function (request, h) {
    try {
      const user = await deleteUser(
        request.server.app.prisma,
        request.payload as UserModel,
        request.server.app.logger
      );
      if (user) {
        return successResponse(h, 'User deletion done successfully', user);
      } else {
        return failureResponse(h, 'Mandatory fields are not provided');
      }
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});
