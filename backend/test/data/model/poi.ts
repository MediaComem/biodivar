import { PrismaClient } from "@prisma/client";
import { CoordinateModel } from "../../../src/types/coordinate-model";

import { PoiModel } from "../../../src/types/poi-model";
import { SymbolModel } from "../../../src/types/symbol-model";

export const setupPoi = async (prisma: PrismaClient) => {
  if (test_poi.coordinate) {
    test_poi.coordinate = undefined;
  }
  if (test_poi.symbol) {
    test_poi.symbol = undefined;
  }
  const first_poi = test_poi;
  first_poi.id = 1;
  await prisma.poi.create({
    data: first_poi,
  });
  const second_poi = test_poi;
  first_poi.id = 2;
  await prisma.poi.create({
    data: second_poi,
  });
};

export const dropPoi = async (prisma: PrismaClient) => {
  await prisma.poi.deleteMany({});
};

export const coordinate_test: CoordinateModel = {
  long: 12.2,
  lat: 13.3,
  alt: 14.4,
  creation_date: new Date(),
};

export const symbol_test: SymbolModel = {
  media_type: "Video",
  url: "/specific/path",
  elevation_ground: 355.36,
  is_facing_user: false,
  is_visible: true,
};

export const test_poi: PoiModel = {
  title: "POI 1",
  title_is_visible: true,
  author: 1,
  creation_date: new Date(),
  biovers: 1,
  radius: 15.5,
  style_type: "sphere",
  style_stroke: true,
  style_stroke_width: 1.2,
  style_fill: false,
  style_elevation: 16.4,
  style_elevation_ground: 32.4,
  style_noise: 22.3,
  style_is_visible: true,
  visible_from: 455.5,
  trigger_mode: "location",
  media: undefined,
};
