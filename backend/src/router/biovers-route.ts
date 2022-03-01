import { ServerRoute } from '@hapi/hapi';

import {
  createBiovers,
  deleteBiovers,
  getBioversByUser,
  getBioversById,
  getPublicBiovers,
  updateBiovers,
} from '../controller/biovers-controller';
import { BioversModel } from '../types/biovers-model';
import {
  errorResponse,
  successResponse,
  successWithoutContentResponse,
} from '../utils/response';

export const bioversRoutes: ServerRoute[] = [];

bioversRoutes.push({
  method: 'GET',
  path: '/biovers',
  handler: async function (request, h) {
    try {
      const biovers = await getPublicBiovers(
        request.server.app.prisma,
        request.server.app.logger
      );
      if (biovers) {
        return successResponse(
          h,
          'Get public biovers done successfully',
          biovers
        );
      } else {
        return successWithoutContentResponse(
          h,
          'Get public biovers done successfully'
        );
      }
    } catch (error) {
      errorResponse(h, error as string);
    }
  },
});

bioversRoutes.push({
  method: 'GET',
  path: '/biovers/id',
  handler: async function (request, h) {
    try {
      const biovers = await getBioversById(
        request.server.app.prisma,
        +request.query.id,
        request.auth.credentials.id as number,
        request.server.app.logger
      );
      if (biovers) {
        return successResponse(h, 'Get biovers done successfully', biovers);
      } else {
        return successWithoutContentResponse(h, 'Get biovers done successfully');
      }
    } catch (error) {
      errorResponse(h, error as string);
    }
  },
});

bioversRoutes.push({
  method: 'GET',
  path: '/biovers/user',
  handler: async function (request, h) {
    const biovers = await getBioversByUser(
      request.server.app.prisma,
      +request.query.id
    );
    if (biovers) {
      return successResponse(h, 'Get biovers done successfully', biovers);
    } else {
      return successWithoutContentResponse(
        h,
        'Get public biovers done successfully'
      );
    }
  },
});

bioversRoutes.push({
  method: 'POST',
  path: '/biovers/create',
  handler: async function (request, h) {
    try {
      const biover = request.payload as BioversModel;
      if (!biover.owner) {
        biover.owner = request.state.biodivar.id;
      }
      const biovers = await createBiovers(
        request.server.app.prisma,
        request.payload as BioversModel,
        request.server.app.logger
      );
      return successResponse(h, 'Biovers creation done successfully', biovers);
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});

bioversRoutes.push({
  method: 'POST',
  path: '/biovers/update',
  handler: async function (request, h) {
    try {
      const biovers = await updateBiovers(
        request.server.app.prisma,
        request.payload as BioversModel,
        request.server.app.logger
      );
      return successResponse(
        h,
        'Biovers update done successfully',
        biovers
      );
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});

bioversRoutes.push({
  method: 'POST',
  path: '/biovers/delete',
  handler: async function (request, h) {
    try {
      const biovers = await deleteBiovers(
        request.server.app.prisma,
        request.payload as BioversModel,
        request.server.app.logger
      );
      return successResponse(h, 'Biovers deletion done successfully', biovers);
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});
