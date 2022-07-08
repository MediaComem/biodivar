import { ServerRoute } from '@hapi/hapi';

import {
  createMedia,
  updateMedia,
  deleteMedia,
  getMediaById,
  getMediaUrlById,
} from '../controller/media-controller';
import { MediaModel } from '../types/media_model';

import {
  successWithoutContentResponse,
  successResponse,
  errorResponse,
} from '../utils/response';

import {
  storeSymbol
} from '../utils/symbol-storing';

export const mediaRoutes: ServerRoute[] = [];

mediaRoutes.push({
  method: 'GET',
  path: '/media/id',
  options: {
    handler: async function (request, h) {
      const url = await getMediaUrlById(
        request.server.app.prisma,
        +request.query.id
      );
      if (url) {
        return h.file(url);
      } else {
        return successWithoutContentResponse(h, 'Get Media done successfully');
      }
    },
    auth: {
      mode: 'try',
    },
  }
});

mediaRoutes.push({
  method: 'POST',
  path: '/media/create',
  options: {
    payload: {
      maxBytes: 1000 * 1000 * 15,
      parse: true,
      allow: 'multipart/form-data',
      multipart: { output: 'stream' },
    }
  },
  handler: async function (request, h) {
    try {
      const payload: any = request.payload;
      const file = payload.file;
      const path = await storeSymbol(request.state.biodivar.id as number, file.hapi.filename, file._data, request.server.app.logger);
      return successResponse(h, 'Symbol creation done successfully', path);
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
      const media = await updateMedia(
        request.server.app.prisma,
        request.payload as MediaModel,
        request.server.app.logger
      );
      if (media) {
        return successResponse(h, 'Media update done successfully', media);
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
      const media = await deleteMedia(
        request.server.app.prisma,
        request.payload as MediaModel,
        request.server.app.logger
      );
      if (media) {
        return successResponse(h, 'Media deletion done successfully', media);
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
