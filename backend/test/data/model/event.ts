import { PrismaClient } from '@prisma/client';

import { CoordinateModel } from '../../../src/types/coordinate-model';
import { EventModel } from '../../../src/types/event-model';

const coordinate: CoordinateModel = {
  lat: 12.2,
  long: 13.3,
  alt: 14.4,
};

export const event: EventModel = {
  id: 1,
  author: 1,
  biovers: 1,
  coordinate: coordinate,
  gps_accuracy: 2.3,
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
      gps_accuracy: event.gps_accuracy,
      coordinate: {
        create: {
          long: event.coordinate.long,
          lat: event.coordinate.lat,
          alt: event.coordinate.alt,
          creation_date: new Date(),
        }
      }
    },
  });
};

export const dropEvent = async (prisma: PrismaClient) => {
  await prisma.event.deleteMany({});
};
