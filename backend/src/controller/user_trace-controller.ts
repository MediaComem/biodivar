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
        gps_accuracy: user_trace.gps_accuracy,
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
    throw new Error('Cannot create user trace due to error');
  }
};

export const deleteUserTrace = async (
  prisma: PrismaClient,
  user_trace: UserTraceModel,
  logger: winston.Logger
) => {
  try {
    if (user_trace && user_trace.id) {
      return await prisma.userTrace.update({
        where: {
          id: +user_trace.id,
        },
        data: {
          deleted_date: new Date().toISOString(),
        },
      });
    }
    return undefined;
  } catch (error) {
    logger.error(error);
    return new Error('Cannot delete user trace due to error');
  }
};