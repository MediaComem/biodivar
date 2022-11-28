import { ServerRoute } from '@hapi/hapi';

import {
  getSymbolById,
} from '../controller/symbol-controller';

import {
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
        return h.file(process.env.DEFAULT_SYMBOL_PATH || '');
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
      maxBytes: 1000 * 1000 * 50,
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
