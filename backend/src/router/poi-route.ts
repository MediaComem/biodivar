import { ServerRoute } from '@hapi/hapi';

import {
  createPoi,
  deletePoi,
  getPoiById,
  getPoiByTitle,
  updatePoi,
} from '../controller/poi-controller';
import { PoiModel, PoiModels } from '../types/poi-model';

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
      const poi = request.payload as PoiModel;
      if (!poi.author) {
        poi.author = request.state.biodivar.id;
      }
      const pois = await createPoi(
        request.server.app.prisma,
        poi,
        request.server.app.logger
      );
      if (pois) {
        return successResponse(h, 'POI creation done successfully', pois);
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
  path: '/poi/creates',
  handler: async function (request, h) {
    try {
      const pois = request.payload as PoiModels;
      const results = [];
      for (let i = 0; i < pois.length; i++) {
        if (!pois[i].author) {
          pois[i].author = request.state.biodivar.id;
        }
        const result = await createPoi(
          request.server.app.prisma,
          pois[i],
          request.server.app.logger
        );
        results.push(result);
      }
      if (results.length > 0) {
        return successResponse(h, 'POI creation done successfully', results);
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
      const poi = request.payload as PoiModel;
      if (!poi.author) {
        poi.author = request.state.biodivar.id;
      }
      const pois = await updatePoi(
        request.server.app.prisma,
        poi,
        request.server.app.logger
      );
      if (pois) {
        return successResponse(h, 'POI update done successfully', pois);
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
      const poi = request.payload as PoiModel;
      if (!poi.author) {
        poi.author = request.state.biodivar.id;
      }
      const pois = await deletePoi(
        request.server.app.prisma,
        poi,
        request.server.app.logger
      );
      if (pois) {
        return successResponse(h, 'POI deletion done successfully', pois);
      } else {
        return failureResponse(h, 'Mandatory fields are not provided');
      }
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});
