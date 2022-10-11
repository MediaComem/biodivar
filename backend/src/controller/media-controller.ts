import { Prisma, PrismaClient } from '@prisma/client';
import winston from 'winston';
import { MediaModel, MediaModels } from '../types/media_model';

export const onlyInLeft = (left: MediaModels, right: MediaModels) => {
  return left.filter(leftValue =>
    !right.some(rightValue => 
     leftValue.id === rightValue.id));
};

export const inTheTwoArrays = (left: MediaModels, right: MediaModels) => {
  return left.filter(leftValue =>
    right.some(rightValue => 
     leftValue.id === rightValue.id));
};

export const getMediaById = async (prisma: PrismaClient, id: number) => {
  return await prisma.media.findFirst({
    where: {
      id: id,
      deleted_date: null,
    },
  });
};

export const getMediaUrlById = async (prisma: PrismaClient, id: number) => {
  const media = await prisma.media.findFirst({
    where: {
      id: id,
      deleted_date: null,
    },
  });
  if (media && media.url) {
    return media.url;
  }
  return '';
};

export const getMediasByPoi = async (prisma: PrismaClient, id: number) => {
  return await prisma.media.findMany({
    where: {
      poi_id: id,
      deleted_date: null,
    },
  });
};

export const createMedia = async (
  prisma: PrismaClient,
  media: MediaModel,
  logger: winston.Logger
) => {
  try {
    return await prisma.media.create({
      data: {
        text: media.text ? media.text : null,
        media_type: media.media_type ? media.media_type : null,
        url: media.url ? media.url : null,
        is_facing: media.is_facing,
        autoplay: media.autoplay,
        loop: media.loop,
        scale: media.scale,
        amplitude: media.amplitude,
        metadata: media.metadata ? media.metadata : null,
        creation_date: new Date(),
        poi_id: media.poi_id,
        position: {
          create: {
            distance: media.position.distance,
            rotation: media.position.rotation,
            elevation: media.position.elevation,
          },
        },
      },
    });
  } catch (error) {
    logger.error(error);
    throw new Error('Cannot create media due to error');
  }
};

export const updateMedia = async (
  prisma: PrismaClient,
  media: MediaModel,
  logger: winston.Logger
) => {
  try {
    const position: Prisma.PositionUpdateWithoutMediaInput = media.position as Prisma.PositionUpdateWithoutMediaInput
    return await prisma.media.update({
      where: {
        id: media.id,
      },
      data: {
        text: media.text ? media.text : null,
        media_type: media.media_type ? media.media_type : null,
        url: media.url ? media.url : null,
        is_facing: media.is_facing,
        autoplay: media.autoplay,
        loop: media.loop,
        scale: media.scale,
        amplitude: media.amplitude,
        metadata: media.metadata ? media.metadata : null,
        update_date: new Date(),
        position: {
          update: position,
        }
      },
    });
  } catch (error) {
    logger.error(error);
    throw new Error('Cannot update media due to error');
  }
};

export const deleteMedia = async (
  prisma: PrismaClient,
  media: MediaModel,
  logger: winston.Logger
) => {
  try {
    if (media && media.id) {
      return await prisma.media.update({
        where: {
          id: media.id,
        },
        data: {
          deleted_date: new Date(),
        },
      });
    } else {
      return undefined;
    }
  } catch (error) {
    logger.error(error);
    throw new Error('Cannot delete media due to error');
  }
};
