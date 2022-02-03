import { ServerRoute } from '@hapi/hapi';

import { createUserTrace } from '../controller/user_trace-controller';
import { UserTraceModel } from '../types/user_trace-model';

import { errorResponse, successResponse } from '../utils/response';

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
