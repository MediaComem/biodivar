import { ServerRoute } from "@hapi/hapi";

import { createPath, deletePath, getPathById, getPathsByUser, updatePath } from "../controller/path-controller";
import { PathModel } from "../types/path-model";

import {
  failureResponse,
  errorResponse,
  successResponse,
  successWithoutContentResponse,
} from '../utils/response';

export const pathRoutes: ServerRoute[] = [];

pathRoutes.push({
  method: "GET",
  path: "/path/id",
  handler: async function (request, h) {
    const path = await getPathById(
      request.server.app.prisma,
      +request.query.id,
    );
    if (path) {
      return successResponse(h, 'Get Path done successfully', path);
    } else {
      return successWithoutContentResponse(h, 'Get Path done successfully');
    }
  },
});

pathRoutes.push({
  method: "GET",
  path: "/path/user",
  handler: async function (request, h) {
    const path = await getPathsByUser(
      request.server.app.prisma,
      +request.query.user,
    );
    if (path) {
      return successResponse(h, 'Get Path done successfully', path);
    } else {
      return successWithoutContentResponse(h, 'Get Path done successfully');
    }
  },
});

pathRoutes.push({
  method: "POST",
  path: "/path/create",
  handler: async function (request, h) {
    try {
      const path = await createPath(
        request.server.app.prisma,
        request.payload as PathModel,
        request.server.app.logger
      );
      return successResponse(h, 'Path creation done successfully', path);
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});

pathRoutes.push({
  method: "POST",
  path: "/path/update",
  handler: async function (request, h) {
    try {
      const path = await updatePath(
        request.server.app.prisma,
        request.payload as PathModel,
        request.server.app.logger
      );
      return successResponse(h, 'Path update done successfully', path);
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});

pathRoutes.push({
  method: "POST",
  path: "/path/delete",
  handler: async function (request, h) {
    try {
      const path = await deletePath(
        request.server.app.prisma,
        request.payload as PathModel,
        request.server.app.logger
      );
      if (path) {
        return successResponse(h, 'Path deletion done successfully', path);
      }
      else {
        return failureResponse(h, 'Mandatory fields are not provided');
      }
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});
