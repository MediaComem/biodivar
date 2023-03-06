import { PrismaClient } from '@prisma/client';
import { MediaModel } from '../../../src/types/media_model';

export const media_test: MediaModel = {
  text: undefined,
  media_type: 'Video',
  url: '/specific/path',
  is_facing: true,
  is_visible_in_radius: true,
  is_visible_out_radius: true,
  autoplay: true,
  loop: false,
  scale: 1.0,
  amplitude: 0.0,
  metadata: '',
  distance: 10,
  rotation: 20,
  elevation: 30,
  orientation: 0,
};

export const setupMedia = async (prisma: PrismaClient) => {
  await prisma.media.create({
    data: {
      id: 2,
      media_type: media_test.media_type,
      url: media_test.url,
      is_facing: media_test.is_facing,
      is_visible_in_radius: media_test.is_visible_in_radius,
      is_visible_out_radius: media_test.is_visible_out_radius,
      autoplay: media_test.autoplay,
      loop: media_test.loop,
      scale: media_test.scale,
      amplitude: media_test.amplitude,
      metadata: media_test.metadata,
      creation_date: new Date(),
      distance: media_test.distance,
      rotation: media_test.rotation,
      elevation: media_test.elevation,
      orientation: media_test.orientation,
    },
  });
};

export const dropMedia = async (prisma: PrismaClient) => {
  await prisma.media.deleteMany({});
};
