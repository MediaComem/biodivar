import { PrismaClient } from '@prisma/client';
import { MediaModel } from '../../../src/types/media_model';

export const media_test: MediaModel = {
  text: undefined,
  media_type: 'Video',
  url: '/specific/path',
  is_facing: true,
  autoplay: true,
  loop: false,
  scale: 1.0,
  amplitude: 0.0,
};

export const setupMedia = async (prisma: PrismaClient) => {
  await prisma.media.create({
    data: {
      id: 2,
      media_type: media_test.media_type,
      url: media_test.url,
      is_facing: media_test.is_facing,
      autoplay: media_test.autoplay,
      loop: media_test.loop,
      scale: media_test.scale,
      amplitude: media_test.amplitude,
      creation_date: new Date(),
    },
  });
};

export const dropMedia = async (prisma: PrismaClient) => {
  await prisma.media.deleteMany({});
};
