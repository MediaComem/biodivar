import { PrismaClient, Prisma } from '@prisma/client';
import winston from 'winston';
import { MediaModel, MediaModels } from '../types/media_model';
import { PoiModel } from '../types/poi-model';

import { updateMedia, createMedia, getMediasByPoi, deleteMedia, onlyInLeft, inTheTwoArrays } from './media-controller';

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
    const position: Prisma.PositionCreateWithoutPoiInput = poi.position as Prisma.PositionCreateWithoutPoiInput;
    const newPoi = await prisma.poi.create({
      data: {
        title: poi.title ? poi.title : '',
        title_is_visible: poi.title_is_visible 
          ? poi.title_is_visible : true,
        subtitle: poi.subtitle ? poi.subtitle : '',
        subtitle_is_visible: poi.subtitle_is_visible
          ? poi.subtitle_is_visible
          : false,
        author: poi.author,
        creation_date: new Date(),
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
        metadata: poi.metadata && poi.metadata.length > 0 ? JSON.stringify(poi.metadata) : null,
        coordinate: {
          create: coordinate,
        },
        symbol: poi.symbol ? {
          create: {
            media_type: poi.symbol.media_type,
            url: poi.symbol.url,
            is_facing_user: poi.symbol.is_facing_user,
            media_type_audio: poi.symbol.media_type_audio,
            audio_url: poi.symbol.audio_url,
            is_visible: poi.symbol.is_visible,
            is_visible_ar: poi.symbol.is_visible_ar,
            media_type_ar: poi.symbol.media_type_ar,
            ar_url: poi.symbol.ar_url,
            amplitude: poi.symbol.amplitude,
            audio_autoplay: poi.symbol.audio_autoplay,
            audio_distance: poi.symbol.audio_distance,
            audio_loop: poi.symbol.audio_loop,
            autoplay: poi.symbol.autoplay,
            wireframe: poi.symbol.wireframe,
            scale: poi.symbol.scale,
            loop: poi.symbol.loop,
            creation_date: new Date(),
            position: {
              create: {
                distance: poi.symbol?.position?.distance,
                rotation: poi.symbol?.position?.rotation,
                elevation: poi.symbol?.position?.elevation,
              }
            }
          },
        } : undefined,
        position: {
          create: position,
        }
      },
      include: {
        position: true,
        coordinate: true,
        symbol: {
          include: {
            position: true,
          },
        },
        media: {
          where: {
            deleted_date: null,
          },
          include: {
            position: true,
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
        poi.media[i].metadata = JSON.stringify(poi.media[i].metadata);
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
      position: true,
      coordinate: true,
      symbol: {
        include: {
          position: true,
        },
      },
      media: {
        where: {
          deleted_date: null,
        },
        include: {
          position: true,
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
      position: true,
      coordinate: true,
      symbol: {
        include: {
          position: true,
        },
      },
      media: {
        where: {
          deleted_date: null,
        },
        include: {
          position: true,
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
      if (poi.symbol) {
        poi.symbol.creation_date = new Date();
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
          title_is_visible: poi.title_is_visible,
          subtitle: poi.subtitle,
          subtitle_is_visible: poi.subtitle_is_visible,
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
          position: poi.position ? {
            upsert: {
              create: {
                distance: poi.position.distance,
                rotation: poi.position.rotation,
                elevation: poi.position.elevation,
              },
              update: {
                distance: poi.position.distance,
                rotation: poi.position.rotation,
                elevation: poi.position.elevation,
              },
            }
          } : undefined,
          symbol: poi.symbol ? {
            upsert: {
              create: {
                media_type: poi.symbol.media_type,
                url: poi.symbol.url,
                is_facing_user: poi.symbol.is_facing_user,
                media_type_audio: poi.symbol.media_type_audio,
                audio_url: poi.symbol.audio_url,
                is_visible: poi.symbol.is_visible,
                is_visible_ar: poi.symbol.is_visible_ar,
                media_type_ar: poi.symbol.media_type_ar,
                ar_url: poi.symbol.ar_url,
                amplitude: poi.symbol.amplitude,
                audio_autoplay: poi.symbol.audio_autoplay,
                audio_distance: poi.symbol.audio_distance,
                audio_loop: poi.symbol.audio_loop,
                autoplay: poi.symbol.autoplay,
                wireframe: poi.symbol.wireframe,
                scale: poi.symbol.scale,
                loop: poi.symbol.loop,
                creation_date: new Date(),
                position: poi.symbol.position ? {
                    create: {
                      distance: poi.symbol.position.distance,
                      rotation: poi.symbol.position.rotation,
                      elevation: poi.symbol.position.elevation,
                    },
                } : undefined,
              },
              update: {
                media_type: poi.symbol.media_type,
                url: poi.symbol.url,
                is_facing_user: poi.symbol.is_facing_user,
                media_type_audio: poi.symbol.media_type_audio,
                audio_url: poi.symbol.audio_url,
                is_visible: poi.symbol.is_visible,
                is_visible_ar: poi.symbol.is_visible_ar,
                media_type_ar: poi.symbol.media_type_ar,
                ar_url: poi.symbol.ar_url,
                amplitude: poi.symbol.amplitude,
                audio_autoplay: poi.symbol.audio_autoplay,
                audio_distance: poi.symbol.audio_distance,
                audio_loop: poi.symbol.audio_loop,
                autoplay: poi.symbol.autoplay,
                wireframe: poi.symbol.wireframe,
                scale: poi.symbol.scale,
                loop: poi.symbol.loop,
                update_date: new Date(),
                position: poi.symbol.position ? {
                  upsert: {
                    create: {
                      distance: poi.symbol.position.distance,
                      rotation: poi.symbol.position.rotation,
                      elevation: poi.symbol.position.elevation,
                    },
                    update: {
                      distance: poi.symbol.position.distance,
                      rotation: poi.symbol.position.rotation,
                      elevation: poi.symbol.position.elevation,
                    },
                  }
                } : undefined,
              },
            }
          } : undefined,
        },
        include: {
          position: true,
          coordinate: true,
          symbol: {
            include: {
              position: true,
            },
          },
          media: {
            where: {
              deleted_date: null,
            },
            include: {
              position: true,
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
