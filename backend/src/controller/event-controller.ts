import { PrismaClient } from '@prisma/client';
import winston from 'winston';
import { EventModel } from '../types/event-model';

export const createEvent = async (
  prisma: PrismaClient,
  event: EventModel,
  logger: winston.Logger
) => {
  try {
    return await prisma.event.create({
      data: {
        author: event.author,
        creation_date: new Date(),
        biovers: event.biovers,
        data: event.data,
      },
    });
  } catch (error) {
    logger.error(error);
    throw new Error('Cannot create event due to error');
  }
};

export const deleteEvent = async (
  prisma: PrismaClient,
  event: EventModel,
  logger: winston.Logger
) => {
  try {
    if (event && event.id) {
      return await prisma.event.update({
        where: {
          id: +event.id,
        },
        data: {
          deleted_date: new Date().toISOString(),
        },
      });
    }
    return undefined;
  } catch (error) {
    logger.error(error);
    return new Error('Cannot delete event due to error');
  }
};