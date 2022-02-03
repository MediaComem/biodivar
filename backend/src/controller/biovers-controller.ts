import { Prisma, PrismaClient } from '@prisma/client';
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

export const getBioversById = async (
  prisma: PrismaClient,
  biovers_id: number,
  user_id: number,
  logger: winston.Logger
) => {
  try {
    return await prisma.biovers.findFirst({
      where: {
        OR: [
          {
            owner: user_id,
            id: biovers_id,
          },
          {
            id: biovers_id,
            is_public: true,
          },
        ],
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
  } catch (error) {
    logger.error(error);
    throw new Error('Cannot get biovers due to error');
  }
  
};

export const getPublicBiovers = async (
  prisma: PrismaClient,
  logger: winston.Logger
) => {
  try {
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
  } catch (error) {
    logger.error(error);
    throw new Error('Cannot get public biovers due to error');
  }
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
    throw new Error('Cannot create biovers due to error');
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
    throw new Error('Cannot update biovers due to error');
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
    throw new Error('Cannot delete biovers due to error');
  }
};
