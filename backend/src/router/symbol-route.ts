import { ServerRoute } from '@hapi/hapi';

import {
  createSymbol,
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

export const symbolRoutes: ServerRoute[] = [];

symbolRoutes.push({
  method: 'GET',
  path: '/symbol/id',
  handler: async function (request, h) {
    const symbol = await getSymbolById(
      request.server.app.prisma,
      +request.query.id
    );
    if (symbol) {
      return successResponse(h, 'Get Symbol done successfully', symbol);
    } else {
      return successWithoutContentResponse(h, 'Get Symbol done successfully');
    }
  },
});

symbolRoutes.push({
  method: 'POST',
  path: '/symbol/create',
  handler: async function (request, h) {
    try {
      const symbol = await createSymbol(
        request.server.app.prisma,
        request.payload as SymbolModel,
        request.server.app.logger
      );
      if (symbol) {
        return successResponse(h, 'Symbol creation done successfully', symbol);
      } else {
        return successWithoutContentResponse(
          h,
          'Symbol creation done successfully'
        );
      }
    } catch (error) {
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
