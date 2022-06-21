import { ServerRoute } from '@hapi/hapi';

import {
  createSymbol,
  getSymbolArById,
  updateSymbol,
  deleteSymbol,
  getSymbolById,
} from '../controller/symbol-controller';
import { SymbolModel } from '../types/symbol-model';

import {
  successWithoutContentResponse,
  successResponse,
  errorResponse,
} from '../utils/response';

import {
  storeSymbol
} from '../utils/symbol-storing';

export const symbolRoutes: ServerRoute[] = [];

symbolRoutes.push({
  method: 'GET',
  path: '/symbol/id',
  options: {
    handler: async function (request, h) {
      const symbol = await getSymbolById(
        request.server.app.prisma,
        +request.query.id
      );
      if (symbol) {
        return h.file(symbol);
      } else {
        return errorResponse(h, 'Get Symbol done successfully');
      }
    },
    auth: {
      mode: 'try',
    },
  },
});

symbolRoutes.push({
  method: 'GET',
  path: '/symbol_ar/id',
  options: {
    handler: async function (request, h) {
      const symbol = await getSymbolArById(
        request.server.app.prisma,
        +request.query.id
      );
      if (symbol) {
        return h.file(symbol);
      } else {
        return errorResponse(h, 'Get Symbol done successfully');
      }
    },
    auth: {
      mode: 'try',
    },
  },
});

symbolRoutes.push({
  method: 'POST',
  path: '/symbol/create',
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
      request.server.app.logger.error(error);
      return errorResponse(h, error as string);
    }
  },
});

symbolRoutes.push({
  method: 'POST',
  path: '/symbol/update',
  handler: async function (request, h) {
    try {
      const symbol = await updateSymbol(
        request.server.app.prisma,
        request.payload as SymbolModel,
        request.server.app.logger
      );
      if (symbol) {
        return successResponse(h, 'Symbol update done successfully', symbol);
      } else {
        return successWithoutContentResponse(
          h,
          'Symbol update done successfully'
        );
      }
    } catch (error) {
      request.server.app.logger.error(error);
      return errorResponse(h, error as string);
    }
  },
});

symbolRoutes.push({
  method: 'POST',
  path: '/symbol/delete',
  handler: async function (request, h) {
    try {
      const symbol = await deleteSymbol(
        request.server.app.prisma,
        request.payload as SymbolModel,
        request.server.app.logger
      );
      if (symbol) {
        return successResponse(h, 'Symbol deletion done successfully', symbol);
      } else {
        return successWithoutContentResponse(
          h,
          'Symbol deletion done successfully'
        );
      }
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});
