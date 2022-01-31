import { PrismaClient } from '@prisma/client';
import winston from 'winston';
import { BioversModel } from '../types/biovers-model';

export const getBioversByUser = async (
  prisma: PrismaClient,
  user_id: number
) => {
  return await prisma.biovers.findMany({
    where: {
      owner: user_id,
      deleted_date: null,
    },
    orderBy: {
      id: 'asc',
    },
    include: {
      Poi: {
        include: {
          coordinate: true,
        },
      },
      Path: {
        include: {
          coordinate: true,
        },
      },
    },
  });
};

export const getPublicBiovers = async (prisma: PrismaClient) => {
  return await prisma.biovers.findMany({
    where: {
      is_public: true,
      deleted_date: null,
    },
    orderBy: {
      id: 'asc',
    },
    include: {
      Poi: {
        include: {
          coordinate: true,
        },
      },
      Path: {
        include: {
          coordinate: true,
        },
      },
    },
  });
};

export const createBiovers = async (
  prisma: PrismaClient,
  biovers: BioversModel,
  logger: winston.Logger
) => {
  try {
    biovers.creation_date = new Date();
    return await prisma.biovers.create({
      data: biovers,
      include: {
        Poi: {
          include: {
            coordinate: true,
          },
        },
        Path: {
          include: {
            coordinate: true,
          },
        },
      },
    });
  } catch (error) {
    logger.error(error);
    return undefined;
  }
};

export const updateBiovers = async (
  prisma: PrismaClient,
  biovers: BioversModel,
  logger: winston.Logger
) => {
  try {
    if (biovers && biovers.id) {
      return await prisma.biovers.update({
        where: {
          id: +biovers.id,
        },
        data: {
          name: biovers.name,
          update_date: new Date(),
        },
        include: {
          Poi: {
            include: {
              coordinate: true,
            },
          },
          Path: {
            include: {
              coordinate: true,
            },
          },
        },
      });
    } else {
      return undefined;
    }
  } catch (error) {
    logger.error(error);
    return undefined;
  }
};

export const deleteBiovers = async (
  prisma: PrismaClient,
  biovers: BioversModel,
  logger: winston.Logger
) => {
  try {
    if (biovers && biovers.id) {
      return await prisma.biovers.update({
        where: {
          id: +biovers.id,
        },
        data: {
          deleted_date: new Date(),
        },
      });
    } else {
      return undefined;
    }
  } catch (error) {
    logger.error(error);
    return undefined;
  }
};
