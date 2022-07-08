import { PrismaClient } from "@prisma/client";
import { CoordinateModel } from "../../../src/types/coordinate-model";

import { media_test } from "./media";

import { PoiModel } from "../../../src/types/poi-model";
import { getPoiByTitle } from "../../../src/controller/poi-controller";

export const setupPoi = async (prisma: PrismaClient) => {
  if (test_poi.coordinate) {
    test_poi.coordinate = undefined;
  }
  if (test_poi.symbol) {
    test_poi.symbol = undefined;
  }
  if (test_poi.media) {
    test_poi.media = undefined;
  }
  const first_poi = test_poi;
  first_poi.id = 1;
  await prisma.poi.create({
    data: first_poi,
  });
  const second_poi = test_poi;
  second_poi.id = 2;
  await prisma.poi.create({
    data: second_poi,
  });
};

export const setupPoiForMedia = async (prisma: PrismaClient) => {
  if (test_poi.coordinate) {
    test_poi.coordinate = undefined;
  }
  if (test_poi.symbol) {
    test_poi.symbol = undefined;
  }
  if (test_poi.media) {
    test_poi.media = undefined;
  }
  const third_poi = test_poi;
  third_poi.title = "POI 3";
  third_poi.id = undefined;
  const element = await prisma.poi.create({
    data: third_poi,
  });

  await prisma.media.create({
    data: {
      media_type: media_test.media_type,
      url: media_test.url,
      elevation_ground: media_test.elevation_ground,
      is_facing_user: media_test.is_facing_user,
      is_visible: media_test.is_visible,
      caption: media_test.caption,
      caption_visible: media_test.caption_visible,
      creation_date: new Date(),
      poi_id: element.id,
    },
  });
  test_poi.title = "POI 1";
};

export const setupPoiForMediaMultiple = async (prisma: PrismaClient) => {
  if (test_poi.coordinate) {
    test_poi.coordinate = undefined;
  }
  if (test_poi.symbol) {
    test_poi.symbol = undefined;
  }
  if (test_poi.media) {
    test_poi.media = undefined;
  }
  const third_poi = test_poi;
  third_poi.title = "POI 4";
  third_poi.id = undefined;
  const element = await prisma.poi.create({
    data: third_poi,
  });

  await prisma.media.create({
    data: {
      media_type: media_test.media_type,
      url: media_test.url,
      elevation_ground: media_test.elevation_ground,
      is_facing_user: media_test.is_facing_user,
      is_visible: media_test.is_visible,
      caption: media_test.caption,
      caption_visible: media_test.caption_visible,
      creation_date: new Date(),
      poi_id: element.id,
    },
  });
  test_poi.title = "POI 1";
};

export const setupPoiForCreateAndDelete = async (prisma: PrismaClient) => {
  if (test_poi.coordinate) {
    test_poi.coordinate = undefined;
  }
  if (test_poi.symbol) {
    test_poi.symbol = undefined;
  }
  if (test_poi.media) {
    test_poi.media = undefined;
  }
  const third_poi = test_poi;
  third_poi.title = "POI 5";
  third_poi.id = undefined;
  const element = await prisma.poi.create({
    data: third_poi,
  });

  await prisma.media.create({
    data: {
      media_type: media_test.media_type,
      url: media_test.url,
      elevation_ground: media_test.elevation_ground,
      is_facing_user: media_test.is_facing_user,
      is_visible: media_test.is_visible,
      caption: media_test.caption,
      caption_visible: media_test.caption_visible,
      creation_date: new Date(),
      poi_id: element.id,
    },
  });
  test_poi.title = "POI 1";
};

export const setupPoiForDeletion = async (prisma: PrismaClient) => {
  if (test_poi.coordinate) {
    test_poi.coordinate = undefined;
  }
  if (test_poi.symbol) {
    test_poi.symbol = undefined;
  }
  if (test_poi.media) {
    test_poi.media = undefined;
  }
  const third_poi = test_poi;
  third_poi.title = "POI 6";
  third_poi.id = undefined;
  const element = await prisma.poi.create({
    data: third_poi,
  });

  await prisma.media.create({
    data: {
      media_type: media_test.media_type,
      url: media_test.url,
      elevation_ground: media_test.elevation_ground,
      is_facing_user: media_test.is_facing_user,
      is_visible: media_test.is_visible,
      caption: media_test.caption,
      caption_visible: media_test.caption_visible,
      creation_date: new Date(),
      poi_id: element.id,
    },
  });
  test_poi.title = "POI 1";
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
