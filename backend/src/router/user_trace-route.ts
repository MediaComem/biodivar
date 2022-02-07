import { ServerRoute } from '@hapi/hapi';

import { createUserTrace, deleteUserTrace } from '../controller/user_trace-controller';
import { UserTraceModel } from '../types/user_trace-model';

import { errorResponse, failureResponse, successResponse } from '../utils/response';

export const userTraceRoutes: ServerRoute[] = [];

userTraceRoutes.push({
  method: 'POST',
  path: '/user_trace/create',
  handler: async function (request, h) {
    try {
      const user_trace = await createUserTrace(
        request.server.app.prisma,
        request.payload as UserTraceModel,
        request.server.app.logger
      );
      return successResponse(
        h,
        'User trace creation done successfully',
        user_trace
      );
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});

userTraceRoutes.push({
  method: 'POST',
  path: '/user_trace/delete',
  handler: async function (request, h) {
    try {
      const trace = await deleteUserTrace(
        request.server.app.prisma,
        request.payload as UserTraceModel,
        request.server.app.logger
      );
      if (trace) {
        return successResponse(h, 'User trace deletion done successfully', trace);
      } else {
        return failureResponse(h, 'Mandatory fields are not provided');
      }
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});
