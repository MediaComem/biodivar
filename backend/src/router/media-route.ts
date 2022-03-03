import { ServerRoute } from '@hapi/hapi';

import {
  createMedia,
  updateMedia,
  deleteMedia,
  getMediaById,
} from '../controller/media-controller';
import { MediaModel } from '../types/media_model';

import {
  successWithoutContentResponse,
  successResponse,
  errorResponse,
} from '../utils/response';

export const mediaRoutes: ServerRoute[] = [];

mediaRoutes.push({
  method: 'GET',
  path: '/media/id',
  handler: async function (request, h) {
    const symbol = await getMediaById(
      request.server.app.prisma,
      +request.query.id
    );
    if (symbol) {
      return successResponse(h, 'Get Media done successfully', symbol);
    } else {
      return successWithoutContentResponse(h, 'Get Media done successfully');
    }
  },
});

mediaRoutes.push({
  method: 'POST',
  path: '/media/create',
  handler: async function (request, h) {
    try {
      const symbol = await createMedia(
        request.server.app.prisma,
        request.payload as MediaModel,
        request.server.app.logger
      );
      if (symbol) {
        return successResponse(h, 'Media creation done successfully', symbol);
      } else {
        return successWithoutContentResponse(
          h,
          'Media creation done successfully'
        );
      }
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});

mediaRoutes.push({
  method: 'POST',
  path: '/media/update',
  handler: async function (request, h) {
    try {
      const symbol = await updateMedia(
        request.server.app.prisma,
        request.payload as MediaModel,
        request.server.app.logger
      );
      if (symbol) {
        return successResponse(h, 'Media update done successfully', symbol);
      } else {
        return successWithoutContentResponse(
          h,
          'Media update done successfully'
        );
      }
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});

mediaRoutes.push({
  method: 'POST',
  path: '/media/delete',
  handler: async function (request, h) {
    try {
      const symbol = await deleteMedia(
        request.server.app.prisma,
        request.payload as MediaModel,
        request.server.app.logger
      );
      if (symbol) {
        return successResponse(h, 'Media deletion done successfully', symbol);
      } else {
        return successWithoutContentResponse(
          h,
          'Media deletion done successfully'
        );
      }
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});
