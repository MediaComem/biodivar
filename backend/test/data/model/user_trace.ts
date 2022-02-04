import { PrismaClient } from '@prisma/client';

import { UserTraceModel } from '../../../src/types/user_trace-model';
import { CoordinateModel } from '../../../src/types/coordinate-model';

const coordinate: CoordinateModel = {
  lat: 12.2,
  long: 13.3,
  alt: 14.4,
};

export const userTrace: UserTraceModel = {
  author: 1,
  is_public: true,
  biovers: 1,
  coordinate: coordinate,
};

export const dropUsersTrace = async (prisma: PrismaClient) => {
  await prisma.userTrace.deleteMany({});
};
