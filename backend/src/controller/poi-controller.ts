import { PrismaClient, Prisma } from '@prisma/client';
import winston from 'winston';
import { MediaModel, MediaModels } from '../types/media_model';
import { PoiModel } from '../types/poi-model';

import { updateMedia, createMedia, getMediasByPoi, deleteMedia, onlyInLeft, inTheTwoArrays } from './media-controller';
import path from 'path';
import fs from 'fs';
import { fileExist } from '../utils/symbol-storing';
import { CoordinateModel } from '../types/coordinate-model';

export const createPoi = async (
  prisma: PrismaClient,
  poi: PoiModel,
  logger: winston.Logger
) => {
  try {
    const coordinate: Prisma.CoordinateCreateWithoutPoiInput = poi.coordinate as Prisma.CoordinateCreateWithoutPoiInput;
    if (!coordinate.creation_date) {
      coordinate.creation_date = new Date();
    }
    const newPoi = await prisma.poi.create({
      data: {
        title: poi.title ? poi.title : '',
        subtitle: poi.subtitle ? poi.subtitle : '',
        author: poi.author,
        creation_date: new Date(),
        last_contributor: poi.author,
        biovers: +poi.biovers,
        scope: +poi.scope,
        trigger_mode: poi.trigger_mode || 'location',
        style_type: poi.style_type,
        extrusion: +poi.extrusion,
        radius: +poi.radius,
        style_stroke_width: poi.style_stroke_width || 0.0,
        stroke_color: poi.stroke_color || '',
        stroke_opacity: +poi.stroke_opacity,
        fill_type: poi.fill_type || false,
        fill_color: poi.fill_color,
        fill_opacity: poi.fill_opacity || 0,
        amplitude: +poi.amplitude,
        wireframe: poi.wireframe,  
        map_url: poi.map_url,
        map_media_type: poi.map_media_type,
        elevation: poi.elevation || 0,
        metadata: poi.metadata && poi.metadata.length > 0 ? JSON.stringify(poi.metadata) : null,
        coordinate: {
          create: coordinate,
        },
      },
      include: {
        coordinate: true,
        media: {
          where: {
            deleted_date: null,
          },
        },
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

    if (poi.media) {
      for (let i = 0; i < poi.media.length; i++) {
        delete poi.media[i].content;
        poi.media[i].creation_date = new Date();
        poi.media[i].poi_id = newPoi.id;
        await createMedia(prisma, poi.media[i], logger);
      };
    }
    return await getPoiById(prisma, newPoi.id);

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
      media: {
        where: {
          deleted_date: null,
        },
      },
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
      media: {
        where: {
          deleted_date: null,
        },
      },
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
      if (poi.coordinate) {
        poi.coordinate.creation_date = new Date();
      }
      if (poi.media && poi.media.length > 0) {
        const inDB = await getMediasByPoi(prisma, poi.id);
        const toBeCreated = onlyInLeft(poi.media, inDB as MediaModels);
        const toBeDeleted = onlyInLeft(inDB as MediaModels, poi.media);
        const toBeUpdated = inTheTwoArrays(poi.media, inDB as MediaModels);

        for (let i = 0; i < toBeDeleted.length; i++) {
          await deleteMedia(prisma, toBeDeleted[i] as MediaModel, logger);
        };

        for (let i = 0; i < toBeCreated.length; i++) {
          toBeCreated[i].poi_id = poi.id;
          await createMedia(prisma, toBeCreated[i], logger);
        }

        for (let i = 0; i < toBeUpdated.length; i++) {
            await updateMedia(prisma, toBeUpdated[i], logger);
        }
      } else {
        const medias = await getMediasByPoi(prisma, poi.id);
        for (let i = 0; i < medias.length; i++) {
          await deleteMedia(prisma, medias[i] as MediaModel, logger);
        };
      }
      return await prisma.poi.update({
        where: {
          id: +poi.id,
        },
        data: {
          title: poi.title,
          subtitle: poi.subtitle,
          author: poi.author,
          update_date: new Date(),
          last_contributor: poi.author,
          biovers: poi.biovers,
          scope: poi.scope,
          trigger_mode: poi.trigger_mode,
          style_type: poi.style_type,
          extrusion: poi.extrusion,
          radius: poi.radius,
          style_stroke_width: poi.style_stroke_width,
          stroke_color: poi.stroke_color,
          stroke_opacity: poi.stroke_opacity,
          fill_type: poi.fill_type,
          fill_color: poi.fill_color,
          fill_opacity: poi.fill_opacity,
          amplitude: poi.amplitude,
          wireframe: poi.wireframe,
          map_url: poi.map_url,
          map_media_type: poi.map_media_type,
          elevation: poi.elevation,
          metadata: poi.metadata && poi.metadata.length > 0 ? JSON.stringify(poi.metadata) : null,
          coordinate: poi.coordinate ? {
            upsert: {
              create: {
                long: poi.coordinate.long,
                lat: poi.coordinate.lat,
                alt: poi.coordinate.alt,
                creation_date: new Date(),
              },
              update: {
                long: poi.coordinate.long,
                lat: poi.coordinate.lat,
                alt: poi.coordinate.alt,
                update_date: new Date(),
              },
            }
          } : undefined,
        },
        include: {
          coordinate: true,
          media: {
            where: {
              deleted_date: null,
            },
          },
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

export const createPoiFromImport = async (features: Array<any>, pathToMedia: string, author: number, prisma: PrismaClient, logger: winston.Logger) => {
  let n = 1;
  const symbolPath = `${process.env.SYMBOL_PATH}/${author}`;
  const resultData = [];
  for (const feature of features) {
    feature['properties']['author'] = author;
    const coordiante = feature['geometry']['coordinates'];
    if (coordiante) {
      feature['properties']['coordinate'] = {long: coordiante[0] ? coordiante[0] : 0, lat: coordiante[1] ? coordiante[0] : 0, alt: coordiante[2] ? coordiante[2] : 0} as CoordinateModel;
    }
    const mapUrl = feature['properties']['map_url'];
    if (mapUrl) {
      const url = mapUrl.replaceAll('\\', '/');
      try {
        fs.mkdirSync(symbolPath, {recursive: true});
        const filename = path.basename(url);
        const finalPath = fileExist(filename, path.join(symbolPath, filename), 1);
        fs.copyFileSync(path.join(pathToMedia, url), finalPath);
        feature['properties']['map_url'] = finalPath;
      } catch (error) {
        logger.error(error);
      }
    }

    const medias = feature['properties']['media'];
    if (medias) {
      for (const media of medias) {
        let hasMissing = false;
        const orientation = media['orientation'];
          if (orientation == undefined) {
            media['orientation'] = 360 / n;
            hasMissing = true;
          }
          const rotation = media['rotation'];
          
          if (rotation == undefined) {
            media['rotation'] = 360 / n;
            hasMissing = true;
          }

          if (hasMissing) {
            n += 1;
          }
        if (media['url'] && media['url'] != '') {
          const url = media['url'].replaceAll('\\', '/');
          try {
            fs.mkdirSync(symbolPath, {recursive: true});
            const filename = path.basename(url);
            const finalPath = fileExist(filename, path.join(symbolPath, filename), 1);
            fs.copyFileSync(path.join(pathToMedia, url), finalPath);
            media['url'] = finalPath;
          } catch (error) {
            logger.error(error);
          }
        }
      }
    }
    resultData.push(await createPoi(prisma, feature['properties'] as PoiModel, logger));
  }
  return resultData;
}