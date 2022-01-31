import { Prisma, PrismaClient } from '@prisma/client';
import winston from 'winston';
import { PathModel } from '../types/path-model';

export const getPathById = async (prisma: PrismaClient, path_id: number) => {
  return await prisma.path.findFirst({
    where: {
      id: path_id,
    },
    include: {
      coordinate: true,
    },
  });
};

export const getPathsByUser = async (prisma: PrismaClient, user_id: number) => {
  return await prisma.path.findMany({
    where: {
      author: user_id,
    },
    include: {
      coordinate: true,
    },
  });
};

export const createPath = async (
  prisma: PrismaClient,
  path: PathModel,
  logger: winston.Logger
) => {
  try {
    const coordiantes: Array<Prisma.CoordinateCreateWithoutPathInput> = [];
    path.coordinate?.forEach((coordiante) => {
      coordiante.creation_date = new Date();
      coordiantes.push(coordiante as Prisma.CoordinateCreateWithoutPathInput);
    });
    return await prisma.path.create({
      data: {
        author: path.author,
        creation_date: new Date(),
        last_contributor: path.last_contributor
          ? path.last_contributor
          : path.author,
        is_public: path.is_public,
        is_editable: path.is_editable,
        biovers: path.biovers,
        style_type: path.style_type,
        style_stroke: path.style_stroke,
        style_stroke_width: path.style_stroke_width,
        style_elevation: path.style_elevation,
        style_elevation_ground: path.style_elevation_ground,
        style_noise: path.style_noise,
        style_is_visible: path.style_is_visible,
        visible_from: path.visible_from,
        metadata: path.metadata,
        coordinate: {
          create: coordiantes,
        },
      },
      include: {
        coordinate: true,
      },
    });
  } catch (error) {
    logger.error(error);
    return undefined;
  }
};

export const updatePath = async (
  prisma: PrismaClient,
  path: PathModel,
  logger: winston.Logger
) => {
  try {
    if (path.coordinate) {
      for (let i = 0; i < path.coordinate?.length; i++) {
        path.coordinate[i].update_date = new Date();
        await prisma.coordinate.update({
          where: {
            id: path.coordinate[i].id,
          },
          data: path.coordinate[i],
        });
      }
    }
    return await prisma.path.update({
      where: {
        id: path.id,
      },
      data: {
        author: path.author,
        creation_date: path.creation_date,
        update_date: new Date(),
        last_contributor: path.last_contributor
          ? path.last_contributor
          : path.author,
        is_public: path.is_public,
        is_editable: path.is_editable,
        biovers: path.biovers,
        style_type: path.style_type,
        style_stroke: path.style_stroke,
        style_stroke_width: path.style_stroke_width,
        style_elevation: path.style_elevation,
        style_elevation_ground: path.style_elevation_ground,
        style_noise: path.style_noise,
        style_is_visible: path.style_is_visible,
        visible_from: path.visible_from,
        metadata: path.metadata,
      },
      include: {
        coordinate: true,
      },
    });
  } catch (error) {
    logger.error(error);
    return undefined;
  }
};

export const deletePath = async (
  prisma: PrismaClient,
  path: PathModel,
  logger: winston.Logger
) => {
  try {
    if (path && path.id) {
      return await prisma.path.update({
        where: {
          id: +path.id,
        },
        data: {
          deleted_date: new Date(),
          coordinate: path.coordinate
            ? {
                updateMany: {
                  where: {
                    path_id: path.id,
                  },
                  data: {
                    deleted_date: new Date(),
                  },
                },
              }
            : undefined,
        },
        include: {
          coordinate: true,
        }
      });
    } else {
      return undefined;
    }
  } catch (error) {
    logger.error(error);
    return undefined;
  }
};
