import { PrismaClient } from '@prisma/client';
import { SymbolModel } from '../../../src/types/symbol-model';

export const symbol_test: SymbolModel = {
  media_type: 'Video',
  url: `${process.env.SYMBOL_PATH}/default/symbol.txt`,
  elevation_ground: 355.36,
  is_facing_user: false,
  is_visible: true,
  media_type_ar: 'gltf',
  ar_url: `${process.env.SYMBOL_PATH}/default/symbol.txt`,
  width: 50,
  height: 50,
};

export const setupSymbol = async (prisma: PrismaClient) => {
  await prisma.symbol.create({
    data: {
      id: 2,
      media_type: symbol_test.media_type,
      url: symbol_test.url,
      media_type_ar: symbol_test.media_type_ar,
      ar_url: symbol_test.ar_url,
      elevation_ground: symbol_test.elevation_ground,
      is_facing_user: symbol_test.is_facing_user,
      is_visible: symbol_test.is_visible,
      creation_date: new Date(),
      width: symbol_test.width,
      height: symbol_test.height,
    },
  });
};

export const dropSymbol = async (prisma: PrismaClient) => {
  await prisma.symbol.deleteMany({});
};
