import { PrismaClient } from '@prisma/client';
import { MediaModel } from '../../../src/types/media_model';

export const media_test: MediaModel = {
  media_type: 'Video',
  url: '/specific/path',
  elevation_ground: 355.36,
  is_facing_user: false,
  is_visible: true,
  caption: 'Test',
  caption_visible: true,
};

export const setupMedia = async (prisma: PrismaClient) => {
  await prisma.media.create({
    data: {
      id: 2,
      media_type: media_test.media_type,
      url: media_test.url,
      elevation_ground: media_test.elevation_ground,
      is_facing_user: media_test.is_facing_user,
      is_visible: media_test.is_visible,
      caption: media_test.caption,
      caption_visible: media_test.caption_visible,
      creation_date: new Date(),
    },
  });
};

export const dropMedia = async (prisma: PrismaClient) => {
  await prisma.media.deleteMany({});
};
