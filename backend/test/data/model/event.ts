import { PrismaClient } from '@prisma/client';

import { EventModel } from '../../../src/types/event-model';


export const event: EventModel = {
  id: 1,
  author: 1,
  biovers: 1,
  data: '{Event: "Open Biovers"}',
};

export const setupEvent = async (prisma: PrismaClient) => {
  await prisma.event.create({
    data: {
      id: event.id,
      author: event.author,
      biovers: event.biovers,
      creation_date: new Date(),
      data: event.data,
    },
  });
};

export const dropEvent = async (prisma: PrismaClient) => {
  await prisma.event.deleteMany({});
};
