import { PrismaClient } from '@prisma/client';
import winston from 'winston';
import { UserTraceModel } from '../types/user_trace-model';

export const createUserTrace = async (
  prisma: PrismaClient,
  user_trace: UserTraceModel,
  logger: winston.Logger
) => {
  try {
    return await prisma.userTrace.create({
      data: {
        author: user_trace.author,
        creation_date: new Date(),
        is_public: user_trace.is_public,
        biovers: user_trace.biovers,
        coordinate: {
          create: {
            long: user_trace.coordinate.long,
            lat: user_trace.coordinate.lat,
            alt: user_trace.coordinate.alt,
            creation_date: new Date(),
          },
        },
      },
      include: {
        coordinate: true,
      },
    });
  } catch (error) {
    logger.error(error);
    throw new Error('Cannot update poi due to error');
  }
};
