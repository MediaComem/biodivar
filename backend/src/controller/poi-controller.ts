import { PrismaClient } from "@prisma/client";
import { PoiModel } from "../types/poi-model";

export const createPoi = async (prisma: PrismaClient, poi: PoiModel) => {
  try {
    poi.creation_date = new Date();
    if (!poi.last_contributor) {
      poi.last_contributor = poi.autor;
    }
    return await prisma.poi.create({
      data: poi,
    });
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getPoiByTitle = async (prisma: PrismaClient, name: string) => {
  return await prisma.poi.findFirst({
    where: {
      title: name,
    },
  });
};

export const updatePoi = async (prisma: PrismaClient, poi: PoiModel) => {
  try {
    poi.update_data = new Date();
    return await prisma.poi.update({
      where: {
        id: poi.id,
      },
      data: poi,
    });
  } catch (error) {
    return undefined;
  }
};

export const deletePoi = async (prisma: PrismaClient, poi_id: number) => {
  try {
    return await prisma.poi.update({
      where: {
        id: poi_id,
      },
      data: {
        deleted_date: new Date(),
      },
    });
  } catch {
    return undefined;
  }
};
