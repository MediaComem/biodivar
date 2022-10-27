import { PrismaClient } from '@prisma/client';
import { SymbolModel } from '../../../src/types/symbol-model';

export const symbol_test: SymbolModel = {
  media_type: 'Video',
  url: `${process.env.SYMBOL_PATH}/default/symbol.txt`,
  media_type_ar: 'gltf',
  ar_url: `${process.env.SYMBOL_PATH}/default/symbol.txt`,
  media_type_audio: 'Audio',
  audio_url: `${process.env.SYMBOL_PATH}/default/symbol.txt`,
  is_facing_user: false,
  is_visible: true,
  is_visible_ar: true,
  amplitude: 0.2,
  audio_autoplay: true,
  audio_distance: 55.5,
  audio_loop: true,
  autoplay: true,
  wireframe: false,
  scale: 1.2,
  loop: true,
  creation_date: new Date(),
};

export const setupSymbol = async (prisma: PrismaClient) => {
  await prisma.symbol.create({
    data: {
      id: 2,
      media_type: symbol_test.media_type,
      url: symbol_test.url,
      media_type_ar: symbol_test.media_type_ar,
      ar_url: symbol_test.ar_url,
      media_type_audio: symbol_test.media_type_audio,
      audio_url: symbol_test.audio_url,
      is_facing_user: symbol_test.is_facing_user,
      is_visible: symbol_test.is_visible,
      is_visible_ar: symbol_test.is_visible_ar,
      amplitude: symbol_test.amplitude,
      audio_autoplay: symbol_test.audio_autoplay,
      audio_distance: symbol_test.audio_distance,
      audio_loop: symbol_test.audio_loop,
      autoplay: symbol_test.autoplay,
      wireframe: symbol_test.wireframe,
      scale: symbol_test.scale,
      loop: symbol_test.loop,
      creation_date: new Date(),
    },
  });
};

export const dropSymbol = async (prisma: PrismaClient) => {
  await prisma.symbol.deleteMany({});
};
