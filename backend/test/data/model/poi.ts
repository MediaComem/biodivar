import { PrismaClient } from "@prisma/client";

import { PoiModel } from "../../../src/types/poi-model";

export const setupPoi = async (prisma: PrismaClient) => {
  await prisma.poi.create({
    data: test_poi,
  });
  await prisma.poi.create({
    data: test_poi,
  });
};

export const dropPoi = async (prisma: PrismaClient) => {
  await prisma.poi.deleteMany({});
};

export const test_poi: PoiModel = {
  title: "POI 1",
  title_is_visible: true,
  autor: 1,
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
};
