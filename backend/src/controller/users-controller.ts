import { Request } from "@hapi/hapi";
import { PrismaClient } from "@prisma/client";

export const getUserById = async (
  prisma: PrismaClient,
  id: number
) => {
  const user = await prisma.user.findFirst({
    where: {
      id: id
    }
  });
  return user;
};

export const getUserByName = async (
  prisma: PrismaClient,
  username: string
) => {
  const user = await prisma.user.findFirst({
    where: {
      username: username
    }
  });
  return user;
};
