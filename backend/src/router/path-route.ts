import { ServerRoute } from "@hapi/hapi";

import { createPath, deletePath, getPathById, getPathsByUser, updatePath } from "../controller/path-controller";
import { PathModel, PathModels } from "../types/path-model";

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
      const path = request.payload as PathModel;
      if (!path.author) {
        path.author = request.state.biodivar.id;
      }
      const paths = await createPath(
        request.server.app.prisma,
        path,
        request.server.app.logger
      );
      return successResponse(h, 'Path creation done successfully', paths);
    } catch (error) {
      return errorResponse(h, error as string);
    }
  },
});

pathRoutes.push({
  method: "POST",
  path: "/path/creates",
  handler: async function (request, h) {
    try {
      const paths = request.payload as PathModels;
      const results = [];
      for (let i = 0; i < paths.length; i++) {
        if (!paths[i].author) {
          paths[i].author = request.state.biodivar.id;
        }
        const result = await createPath(
          request.server.app.prisma,
          paths[i],
          request.server.app.logger
        );
        results.push(result);
      }
      if (results.length > 0) {
        return successResponse(h, 'Path creation done successfully', results);
      } else {
        return failureResponse(h, 'Mandatory fields are not provided');
      }
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
      const path = request.payload as PathModel;
      if (!path.author) {
        path.author = request.state.biodivar.id;
      }
      const paths = await updatePath(
        request.server.app.prisma,
        path,
        request.server.app.logger
      );
      return successResponse(h, 'Path update done successfully', paths);
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
