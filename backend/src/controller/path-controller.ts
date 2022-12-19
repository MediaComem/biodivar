import { Prisma, PrismaClient } from '@prisma/client';
import winston from 'winston';
import { PathModel } from '../types/path-model';

export const getPathById = async (prisma: PrismaClient, path_id: number) => {
  return await prisma.path.findFirst({
    where: {
      id: path_id,
      deleted_date: null,
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
      deleted_date: null,
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
    if (path.coordinate) {
      path.coordinate.forEach((coordiante) => {
        coordiante.creation_date = new Date();
        coordiantes.push(coordiante as Prisma.CoordinateCreateWithoutPathInput);
      });
    }
    return await prisma.path.create({
      data: {
        author: path.author,
        creation_date: new Date(),
        last_contributor: path.last_contributor
          ? path.last_contributor
          : path.author,
        biovers: path.biovers,
        style_type: path.style_type,
        style_stroke_width: path.style_stroke_width,
        stroke_color: path.stroke_color,
        stroke_opacity: path.stroke_opacity,
        elevation: path.elevation,
        amplitude: path.amplitude,
        scope: path.scope,
        metadata: path.metadata && path.metadata.length > 0 ? JSON.stringify(path.metadata) : null,
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
    throw new Error('Cannot create path due to error');
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
        biovers: path.biovers,
        style_type: path.style_type,
        style_stroke_width: path.style_stroke_width,
        stroke_color: path.stroke_color,
        stroke_opacity: path.stroke_opacity,
        elevation: path.elevation,
        amplitude: path.amplitude,
        scope: path.scope,
        metadata: path.metadata && path.metadata.length > 0 ? JSON.stringify(path.metadata) : null,
      },
      include: {
        coordinate: true,
      },
    });
  } catch (error) {
    logger.error(error);
    throw new Error('Cannot update path due to error');
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
    throw new Error('Cannot delete path due to error');
  }
};
