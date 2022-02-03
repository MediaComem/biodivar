import { ServerRoute } from '@hapi/hapi';

import {
  createPoi,
  deletePoi,
  getPoiById,
  getPoiByTitle,
  updatePoi,
} from '../controller/poi-controller';
import { PoiModel } from '../types/poi-model';

import {
  failureResponse,
  errorResponse,
  successResponse,
  successWithoutContentResponse,
} from '../utils/response';

export const poiRoutes: ServerRoute[] = [];

poiRoutes.push({
  method: 'GET',
  path: '/poi/id',
  handler: async function (request, h) {
    const poi = await getPoiById(
      request.server.app.prisma,
      +request.query.id,
    );
    if (poi) {
      return successResponse(h, 'Get POI done successfully', poi);
    } else {
      return successWithoutContentResponse(h, 'Get POI done successfully');
    }
  },
});

poiRoutes.push({
  method: 'GET',
  path: '/poi/title',
  handler: async function (request, h) {
    const poi = await getPoiByTitle(
      request.server.app.prisma,
      request.query.title,
    );
    if (poi) {
      return successResponse(h, 'Get POI done successfully', poi);
    } else {
      return successWithoutContentResponse(h, 'Get POI done successfully');
    }
  },
});

poiRoutes.push({
  method: 'POST',
  path: '/poi/create',
  handler: async function (request, h) {
    try {
      const poi = await createPoi(
        request.server.app.prisma,
        request.payload as PoiModel,
        request.server.app.logger
      );
      if (poi) {
        return successResponse(h, 'POI creation done successfully', poi);
      } else {
        return failureResponse(h, 'Mandatory fields are not provided');
      }
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});

poiRoutes.push({
  method: 'POST',
  path: '/poi/update',
  handler: async function (request, h) {
    try {
      const poi = await updatePoi(
        request.server.app.prisma,
        request.payload as PoiModel,
        request.server.app.logger
      );
      if (poi) {
        return successResponse(h, 'POI update done successfully', poi);
      } else {
        return failureResponse(h, 'Mandatory fields are not provided');
      }
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});

poiRoutes.push({
  method: 'POST',
  path: '/poi/delete',
  handler: async function (request, h) {
    try {
      const poi = await deletePoi(
        request.server.app.prisma,
        request.payload as PoiModel,
        request.server.app.logger
      );
      if (poi) {
        return successResponse(h, 'POI deletion done successfully', poi);
      } else {
        return failureResponse(h, 'Mandatory fields are not provided');
      }
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});
