import { PrismaClient } from '@prisma/client';
import winston from 'winston';
import { PoiModel } from '../types/poi-model';

export const createPoi = async (
  prisma: PrismaClient,
  poi: PoiModel,
  logger: winston.Logger
) => {
  try {
    return await prisma.poi.create({
      data: {
        title: poi.title,
        title_is_visible: poi.title_is_visible,
        subtitle: poi.subtitle ? poi.subtitle : '',
        subtitle_is_visible: poi.subtitle_is_visible
          ? poi.subtitle_is_visible
          : false,
        author: poi.author,
        creation_date: new Date(),
        last_contributor: poi.author,
        is_public: poi.is_public,
        is_editable: poi.is_editable,
        biovers: poi.biovers,
        radius: poi.radius,
        style_type: poi.style_type,
        style_stroke: poi.style_stroke,
        style_stroke_width: poi.style_stroke_width,
        style_fill: poi.style_fill,
        style_elevation: poi.style_elevation,
        style_elevation_ground: poi.style_elevation_ground,
        style_noise: poi.style_noise,
        style_is_visible: poi.style_is_visible,
        visible_from: poi.visible_from,
        trigger_mode: poi.trigger_mode,
        metadata: poi.metadata,
        coordinate: poi.coordinate
          ? {
              create: {
                long: +poi.coordinate?.long,
                lat: +poi.coordinate.lat,
                alt: +poi.coordinate.alt,
                creation_date: new Date(),
              },
            }
          : undefined,
        symbol: poi.symbol
          ? {
              create: {
                media_type: poi.symbol.media_type,
                url: poi.symbol.url,
                elevation_ground: poi.symbol.elevation_ground,
                is_facing_user: poi.symbol.is_facing_user,
                is_visible: poi.symbol.is_visible,
                creation_date: new Date(),
              },
            }
          : {
              create: {
                media_type: '',
                url: '',
                elevation_ground: 0,
                is_facing_user: true,
                is_visible: true,
                creation_date: new Date(),
            },
          },
      },
      include: {
        coordinate: true,
        symbol: true,
        media: true,
        User: {
          select: {
            username: true,
          },
        },
        last_contributor_fk: {
          select: {
            username: true,
          },
        },
      },
    });
  } catch (error) {
    logger.error(error);
    throw new Error('Cannot create poi due to error');
  }
};

export const getPoiById = async (prisma: PrismaClient, id: number) => {
  return await prisma.poi.findFirst({
    where: {
      id: id,
      deleted_date: null,
    },
    include: {
      coordinate: true,
      symbol: true,
      media: true,
      User: {
        select: {
          username: true,
        },
      },
      last_contributor_fk: {
        select: {
          username: true,
        },
      },
    },
  });
};

export const getPoiByTitle = async (prisma: PrismaClient, name: string) => {
  return await prisma.poi.findFirst({
    where: {
      title: name,
      deleted_date: null,
    },
    include: {
      coordinate: true,
      symbol: true,
      media: true,
      User: {
        select: {
          username: true,
        },
      },
      last_contributor_fk: {
        select: {
          username: true,
        },
      },
    },
  });
};

export const updatePoi = async (
  prisma: PrismaClient,
  poi: PoiModel,
  logger: winston.Logger
) => {
  try {
    if (poi && poi.id) {
      poi.update_date = new Date();
      if (poi.coordinate === null) {
        poi.coordinate = undefined;
      }
      return await prisma.poi.update({
        where: {
          id: +poi.id,
        },
        data: {
          title: poi.title,
          title_is_visible: poi.title_is_visible,
          subtitle: poi.subtitle,
          subtitle_is_visible: poi.subtitle_is_visible,
          author: poi.author,
          update_date: new Date(),
          last_contributor: poi.author,
          is_public: poi.is_public,
          is_editable: poi.is_editable,
          biovers: poi.biovers,
          radius: poi.radius,
          style_type: poi.style_type,
          style_stroke: poi.style_stroke,
          style_stroke_width: poi.style_stroke_width,
          style_fill: poi.style_fill,
          style_elevation: poi.style_elevation,
          style_elevation_ground: poi.style_elevation_ground,
          style_noise: poi.style_noise,
          style_is_visible: poi.style_is_visible,
          visible_from: poi.visible_from,
          trigger_mode: poi.trigger_mode,
          metadata: poi.metadata,
          coordinate: poi.coordinate
            ? {
                upsert: {
                  update: {
                    long: +poi.coordinate?.long,
                    lat: +poi.coordinate.lat,
                    alt: +poi.coordinate.alt,
                    update_date: new Date(),
                  },
                  create: {
                    long: +poi.coordinate?.long,
                    lat: +poi.coordinate.lat,
                    alt: +poi.coordinate.alt,
                    creation_date: new Date(),
                  },
                },
              }
            : undefined,
          symbol: poi.symbol
            ? {
                upsert: {
                  update: {
                    media_type: poi.symbol.media_type,
                    url: poi.symbol.url,
                    elevation_ground: poi.symbol.elevation_ground,
                    is_facing_user: poi.symbol.is_facing_user,
                    is_visible: poi.symbol.is_visible,
                    update_date: new Date(),
                  },
                  create: {
                    media_type: poi.symbol.media_type,
                    url: poi.symbol.url,
                    elevation_ground: poi.symbol.elevation_ground,
                    is_facing_user: poi.symbol.is_facing_user,
                    is_visible: poi.symbol.is_visible,
                    creation_date: new Date(),
                  },
                },
              }
            : undefined,
        },
        include: {
          coordinate: true,
          symbol: true,
          media: true,
          User: {
            select: {
              username: true,
            },
          },
          last_contributor_fk: {
            select: {
              username: true,
            },
          },
        },
      });
    } else {
      return undefined;
    }
  } catch (error) {
    logger.error(error);
    throw new Error('Cannot update poi due to error');
  }
};

export const deletePoi = async (
  prisma: PrismaClient,
  poi: PoiModel,
  logger: winston.Logger
) => {
  try {
    if (poi && poi.id) {
      return await prisma.poi.update({
        where: {
          id: +poi.id,
        },
        data: {
          deleted_date: new Date(),
          coordinate: poi.coordinate
            ? {
                update: {
                  deleted_date: new Date(),
                },
              }
            : undefined,
          media: poi.media
            ? {
                updateMany: {
                  where: {
                    poi_id: poi.id,
                  },
                  data: {
                    deleted_date: new Date(),
                  },
                },
              }
            : undefined,
          symbol: poi.symbol
            ? {
                update: {
                  deleted_date: new Date(),
                },
              }
            : undefined,
        },
      });
    } else {
      return undefined;
    }
  } catch (error) {
    logger.error(error);
    throw new Error('Cannot delete poi due to error');
  }
};
