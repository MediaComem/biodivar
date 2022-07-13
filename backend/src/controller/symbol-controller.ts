import { PrismaClient } from '@prisma/client';
import winston from 'winston';
import { SymbolModel } from '../types/symbol-model';
 
export const getSymbolById = async (prisma: PrismaClient, id: number) => {
  const symbol = await prisma.symbol.findFirst({
    where: {
      id: id,
      deleted_date: null,
    },
  });
  if (symbol && symbol.url) {
    return symbol.url;
  }
  return null;
};

export const getSymbolArById = async (prisma: PrismaClient, id: number) => {
  const symbol = await prisma.symbol.findFirst({
    where: {
      id: id,
      deleted_date: null,
    },
  });
  if (symbol && symbol.ar_url) {
    return symbol.ar_url;
  }
  return null;
};

export const createSymbol = async (
  prisma: PrismaClient,
  symbol: SymbolModel,
  logger: winston.Logger
) => {
  try {
    return await prisma.symbol.create({
      data: {
        media_type: symbol.media_type,
        url: symbol.url,
        elevation_ground: symbol.elevation_ground,
        is_facing_user: symbol.is_facing_user,
        is_visible: symbol.is_visible,
        creation_date: new Date(),
      },
    });
  } catch (error) {
    logger.error(error);
    throw new Error('Cannot create symbol due to error');
  }
};

export const updateSymbol = async (
  prisma: PrismaClient,
  symbol: SymbolModel,
  logger: winston.Logger
) => {
  try {
    return await prisma.symbol.update({
      where: {
        id: symbol.id,
      },
      data: {
        media_type: symbol.media_type,
        url: symbol.url,
        elevation_ground: symbol.elevation_ground,
        is_facing_user: symbol.is_facing_user,
        is_visible: symbol.is_visible,
        update_date: new Date(),
      },
    });
  } catch (error) {
    logger.error(error);
    throw new Error('Cannot update symbol due to error');
  }
};

export const deleteSymbol = async (
  prisma: PrismaClient,
  symbol: SymbolModel,
  logger: winston.Logger
) => {
  try {
    if (symbol && symbol.id) {
      return await prisma.symbol.update({
        where: {
          id: symbol.id,
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
    throw new Error('Cannot delete symbol due to error');
  }
};
