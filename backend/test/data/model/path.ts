import { Prisma, PrismaClient } from '@prisma/client';

import { PathModel } from '../../../src/types/path-model';
import {
  CoordinateModel,
  CoordinateModels,
} from '../../../src/types/coordinate-model';

export const coordinate_test: CoordinateModel = {
  long: 12.2,
  lat: 13.3,
  alt: 14.4,
  creation_date: new Date(),
};

const path_coordinates: CoordinateModels = [];
path_coordinates.push(coordinate_test);
path_coordinates.push(coordinate_test);

const coordiantes: Array<Prisma.CoordinateCreateWithoutPathInput> = [];

coordiantes.push(coordinate_test as Prisma.CoordinateCreateWithoutPathInput);
coordiantes.push(coordinate_test as Prisma.CoordinateCreateWithoutPathInput);

export const test_path: PathModel = {
  autor: 1,
  creation_date: new Date(),
  biovers: 1,
  style_type: 'sphere',
  style_stroke: true,
  style_stroke_width: 1.2,
  style_elevation: 16.4,
  style_elevation_ground: 32.4,
  style_noise: 22.3,
  style_is_visible: true,
  visible_from: 455.5,
  coordinate: path_coordinates,
};

export const setupPath = async (prisma: PrismaClient) => {
  await prisma.path.create({
    data: {
      id: 1,
      autor: 1,
      creation_date: new Date(),
      biovers: 1,
      style_type: 'sphere',
      style_stroke: true,
      style_stroke_width: 1.2,
      style_elevation: 16.4,
      style_elevation_ground: 32.4,
      style_noise: 22.3,
      style_is_visible: true,
      visible_from: 455.5,
      coordinate: {
        create: coordiantes,
      },
    },
  });
};

export const dropPath = async (prisma: PrismaClient) => {
  await prisma.path.deleteMany({});
  await prisma.coordinate.deleteMany({});
};
