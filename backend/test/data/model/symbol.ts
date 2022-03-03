import { PrismaClient } from '@prisma/client';
import { SymbolModel } from '../../../src/types/symbol-model';

export const symbol_test: SymbolModel = {
  media_type: 'Video',
  url: '/specific/path',
  elevation_ground: 355.36,
  is_facing_user: false,
  is_visible: true,
};

export const setupSymbol = async (prisma: PrismaClient) => {
  await prisma.symbol.create({
    data: {
      id: 2,
      media_type: symbol_test.media_type,
      url: symbol_test.url,
      elevation_ground: symbol_test.elevation_ground,
      is_facing_user: symbol_test.is_facing_user,
      is_visible: symbol_test.is_visible,
      creation_date: new Date(),
    },
  });
};

export const dropSymbol = async (prisma: PrismaClient) => {
  await prisma.symbol.deleteMany({});
};
