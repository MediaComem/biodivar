import { PrismaClient } from '@prisma/client';
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
        media_type: media.media_type,
        url: media.url,
        elevation_ground: media.elevation_ground,
        is_facing_user: media.is_facing_user,
        is_visible: media.is_visible,
        caption: media.caption,
        caption_visible: media.caption_visible,
        creation_date: new Date(),
        poi_id: media.poi_id,
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
    return await prisma.media.update({
      where: {
        id: media.id,
      },
      data: {
        media_type: media.media_type,
        url: media.url,
        elevation_ground: media.elevation_ground,
        is_facing_user: media.is_facing_user,
        is_visible: media.is_visible,
        caption: media.caption,
        caption_visible: media.caption_visible,
        update_date: new Date(),
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
