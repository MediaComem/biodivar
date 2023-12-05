import { ServerRoute } from '@hapi/hapi';

import {
  createPoi,
  deletePoi,
  exportPoisToZip,
  extractPoisForZip,
  getPoiById,
  getPoiByTitle,
  importPoisFromZip,
  updatePoi,
} from '../controller/poi-controller';
import { PoiModel, PoiModels } from '../types/poi-model';

import {
  failureResponse,
  errorResponse,
  successResponse,
  successWithoutContentResponse,
} from '../utils/response';
import { Poi } from '@prisma/client';

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
      request.server.app.logger.error(error);
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
      request.server.app.logger.error(error);
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
      request.server.app.logger.error(error);
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
      request.server.app.logger.error(error);
      return errorResponse(h, error as string);
    }
  },
});

poiRoutes.push({
  method: 'POST',
  path: '/poi/import',
  options: {
    payload: {
      maxBytes: 1000 * 1000 * 50,
      parse: true,
      allow: 'multipart/form-data',
      multipart: { output: 'stream' },
    }
  },
  handler: async function (request, h) {
    try {
      const payload: any = request.payload;
      const result = await importPoisFromZip(payload, request.state.biodivar.id, request.server.app.prisma, request.server.app.logger)
      return successResponse(h, 'Symbol creation done successfully', result);
    } catch (error) {
      request.server.app.logger.error(error);
      return errorResponse(h, error as string);
    }
  },
});

poiRoutes.push({
  method: 'GET',
  path: '/poi/export',
  handler: async function (request, h) {
    const ids = request.query.ids;
    try {
      const pois:Array<Poi> = await extractPoisForZip(ids, request.server.app.prisma);
      const resultPathZip = await exportPoisToZip(pois, request.state.biodivar.id);
      return h.file(resultPathZip);
    } catch (error) {
      request.server.app.logger.error(error);
      return errorResponse(h, 'Cannot create zip, please contact and administrator');
    }
  },
});
