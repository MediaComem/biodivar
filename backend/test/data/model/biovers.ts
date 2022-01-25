import { PrismaClient } from "@prisma/client";

export const setupBiovers = async (prisma: PrismaClient) => {
  await prisma.biovers.create({
    data: {
      id: 1,
      name: "Biovers 1",
      owner: 1,
      creation_date: new Date().toISOString(),
    },
  });
  await prisma.biovers.create({
    data: {
      id: 2,
      name: "Biovers 2",
      owner: 2,
      creation_date: new Date().toISOString(),
    },
  });
  await prisma.biovers.create({
    data: {
      id: 3,
      name: "Biovers 3",
      owner: 1,
      creation_date: new Date().toISOString(),
      is_public: false,
    },
  });
  await prisma.biovers.create({
    data: {
      id: 4,
      name: "Biovers 4",
      owner: 1,
      creation_date: new Date().toISOString(),
      deleted_date: new Date().toISOString(),
    },
  });
};

export const dropBiovers = async (prisma: PrismaClient) => {
  await prisma.biovers.deleteMany({});
};
