import { PrismaClient } from '@prisma/client';
import { create } from 'domain';
import { MediaModel } from '../../../src/types/media_model';
import { PositionModel } from '../../../src/types/position-model';


export const position_test: PositionModel = {
  distance: 2.5,
  rotation: 5.6,
  elevation: 22.5,
}

export const media_test: MediaModel = {
  text: undefined,
  media_type: 'Video',
  url: '/specific/path',
  is_facing: true,
  is_visible_in_radius: true,
  autoplay: true,
  loop: false,
  scale: 1.0,
  amplitude: 0.0,
  metadata: '',
  position: position_test,
};

export const setupMedia = async (prisma: PrismaClient) => {
  await prisma.media.create({
    data: {
      id: 2,
      media_type: media_test.media_type,
      url: media_test.url,
      is_facing: media_test.is_facing,
      is_visible_in_radius: media_test.is_visible_in_radius,
      autoplay: media_test.autoplay,
      loop: media_test.loop,
      scale: media_test.scale,
      amplitude: media_test.amplitude,
      metadata: media_test.metadata,
      creation_date: new Date(),
      position: {
        create: {
          distance: position_test.distance,
          rotation: position_test.rotation,
          elevation: position_test.elevation
        },
      },
    },
  });
};

export const dropMedia = async (prisma: PrismaClient) => {
  await prisma.media.deleteMany({});
};
