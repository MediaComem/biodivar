import { ServerRoute } from '@hapi/hapi';

import { createEvent, deleteEvent } from '../controller/event-controller';
import { EventModel } from '../types/event-model';

import { errorResponse, failureResponse, successResponse } from '../utils/response';

export const eventRoutes: ServerRoute[] = [];

eventRoutes.push({
  method: 'POST',
  path: '/event/create',
  handler: async function (request, h) {
    try {
      const event = request.payload as EventModel;
      if (!event.author) {
        event.author = request.state.biodivar.id;
      }
      const newEvent = await createEvent(
        request.server.app.prisma,
        event,
        request.server.app.logger
      );
      return successResponse(
        h,
        'User trace creation done successfully',
        newEvent
      );
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});

eventRoutes.push({
  method: 'POST',
  path: '/event/delete',
  handler: async function (request, h) {
    try {
      const event = await deleteEvent(
        request.server.app.prisma,
        request.payload as EventModel,
        request.server.app.logger
      );
      if (event) {
        return successResponse(h, 'User trace deletion done successfully', event);
      } else {
        return failureResponse(h, 'Mandatory fields are not provided');
      }
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});
