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
      User: {
        select: {
          username: true,
        }
      },
      Poi: {
        where: {
          deleted_date: null,
        },
        include: {
          position: true,
          coordinate: true,
          symbol: {
            include: {
              position: true,
            }
          },
          media: {
            where: {
              deleted_date: null,
            },
            include: {
              position: true,
            },
          },
          User: {
            select: {
              username: true,
            }
          },
          last_contributor_fk: {
            select: {
              username: true,
            }
          }
        },
      },
      Path: {
        where: {
          deleted_date: null,
        },
        include: {
          coordinate: true,
          User: {
            select: {
              username: true,
            }
          },
          last_contributor_fk: {
            select: {
              username: true,
            }
          }
        },
      },
      UserTrace: {
        where: {
          deleted_date: null,
          author: user_id,
        },
        include: {
          coordinate: true,
          User: {
            select: {
              username: true,
            }
          },
        }
      },
      Event: {
        where: {
          author: user_id,
          deleted_date: null,
        },
        include: {
          coordinate: true,
          User: {
            select: {
              username: true,
            }
          },
        }
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
            deleted_date: null,
          },
          {
            id: biovers_id,
            is_public: true,
            deleted_date: null,
          },
        ],
      },
      include: {
        User: {
          select: {
            username: true,
          }
        },
        Poi: {
          where: {
            deleted_date: null,
          },
          include: {
            position: true,
            coordinate: true,
            symbol: {
              include: {
                position: true,
              }
            },
            media: {
              where: {
                deleted_date: null,
              },
              include: {
                position: true,
              },
            },
            User: {
              select: {
                username: true,
              }
            },
            last_contributor_fk: {
              select: {
                username: true,
              }
            }
          },
        },
        Path: {
          where: {
            deleted_date: null,
          },
          include: {
            coordinate: true,
            User: {
              select: {
                username: true,
              }
            },
            last_contributor_fk: {
              select: {
                username: true,
              }
            }
          },
        },
        UserTrace: {
          where: {
            deleted_date: null,
            author: user_id,
          },
          include: {
            coordinate: true,
            User: {
              select: {
                username: true,
              }
            },
          }
        },
        Event: {
          where: {
            author: user_id,
            deleted_date: null,
          },
          include: {
            coordinate: true,
            User: {
              select: {
                username: true,
              }
            },
          }
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
  user_id: number,
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
        User: {
          select: {
            username: true,
          }
        },
        Poi: {
          where: {
            deleted_date: null,
          },
          include: {
            position: true,
            coordinate: true,
            symbol: {
              include: {
                position: true,
              }
            },
            media: {
              where: {
                deleted_date: null,
              },
              include: {
                position: true,
              },
            },
            User: {
              select: {
                username: true,
              }
            },
            last_contributor_fk: {
              select: {
                username: true,
              }
            }
          },
        },
        Path: {
          where: {
            deleted_date: null,
          },
          include: {
            coordinate: true,
            User: {
              select: {
                username: true,
              }
            },
            last_contributor_fk: {
              select: {
                username: true,
              }
            }
          },
        },
        UserTrace: {
          where: {
            deleted_date: null,
            author: user_id,
          },
          include: {
            coordinate: true,
            User: {
              select: {
                username: true,
              }
            },
          }
        },
        Event: {
          where: {
            author: user_id,
            deleted_date: null,
          },
          include: {
            coordinate: true,
            User: {
              select: {
                username: true,
              }
            },
          }
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
      data: {
        name: biovers.name,
        description: biovers.description ? biovers.description : '',
        location: biovers.location ? biovers.location : '',
        owner: biovers.owner,
        is_public: biovers.is_public,
        is_editable: biovers.is_editable,
        creation_date: new Date(),
      },
      include: {
        User: {
          select: {
            username: true,
          }
        },
        Poi: {
          where: {
            deleted_date: null,
          },
          include: {
            position: true,
            coordinate: true,
            symbol: {
              include: {
                position: true,
              }
            },
            media: {
              where: {
                deleted_date: null,
              },
              include: {
                position: true,
              },
            },
            User: {
              select: {
                username: true,
              }
            },
            last_contributor_fk: {
              select: {
                username: true,
              }
            }
          },
        },
        Path: {
          include: {
            coordinate: true,
            User: {
              select: {
                username: true,
              }
            },
            last_contributor_fk: {
              select: {
                username: true,
              }
            }
          },
        },
        UserTrace: {
          where: {
            deleted_date: null,
            author: biovers.owner,
          },
          include: {
            coordinate: true,
            User: {
              select: {
                username: true,
              }
            },
          }
        },
        Event: {
          where: {
            author: biovers.owner,
            deleted_date: null,
          },
          include: {
            coordinate: true,
            User: {
              select: {
                username: true,
              }
            },
          }
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
          description: biovers.description,
          location: biovers.location,
          is_public: biovers.is_public,
          is_editable: biovers.is_editable,
          update_date: new Date(),
        },
        include: {
          User: {
            select: {
              username: true,
            }
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
