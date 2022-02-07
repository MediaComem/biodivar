import { PrismaClient } from '@prisma/client';

import { UserTraceModel } from '../../../src/types/user_trace-model';
import { CoordinateModel } from '../../../src/types/coordinate-model';

const coordinate: CoordinateModel = {
  lat: 12.2,
  long: 13.3,
  alt: 14.4,
};

export const userTrace: UserTraceModel = {
  id: 1,
  author: 1,
  is_public: true,
  biovers: 1,
  coordinate: coordinate,
};

export const setupUserTrace = async (prisma: PrismaClient) => {
  await prisma.userTrace.create({
    data: {
      id: userTrace.id,
      author: userTrace.author,
      creation_date: new Date(),
      is_public: userTrace.is_public,
      biovers: userTrace.biovers,
      coordinate: {
        create: {
          long: userTrace.coordinate.long,
          lat: userTrace.coordinate.lat,
          alt: userTrace.coordinate.alt,
          creation_date: new Date(),
        },
      },
    },
  });
};

export const dropUsersTrace = async (prisma: PrismaClient) => {
  await prisma.userTrace.deleteMany({});
};
