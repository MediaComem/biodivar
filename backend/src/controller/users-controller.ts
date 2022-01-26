import { PrismaClient } from "@prisma/client";
import { UserModel } from "../types/user-model";
import Bcrypt from "bcrypt";
import winston from "winston";

export const getUserById = async (prisma: PrismaClient, id: number) => {
  return await prisma.user.findFirst({
    where: {
      id: id,
      deleted_date: null,
    },
  });
};

export const getUserByName = async (prisma: PrismaClient, username: string) => {
  return await prisma.user.findFirst({
    where: {
      username: username,
      deleted_date: null,
    },
  });
};

export const createUser = async (
  prisma: PrismaClient,
  user: UserModel,
  logger: winston.Logger
) => {
  user.creation_date = new Date();
  const password = await Bcrypt.hash(user.password, 10);
  user.password = password;
  try {
    return await prisma.user.create({
      data: user,
    });
  } catch (error) {
    logger.error(error);
    return undefined;
  }
};

export const reactivateUser = async (
  prisma: PrismaClient,
  username: string,
  logger: winston.Logger
) => {
  try {
    return await prisma.user.update({
      where: {
        username: username,
      },
      data: {
        deleted_date: null,
      },
    });
  } catch (error) {
    logger.error(error);
    return undefined;
  }
};

export const updateUser = async (
  prisma: PrismaClient,
  user: UserModel,
  logger: winston.Logger
) => {
  if (user && user.id) {
    try {
      return await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          username: user.username,
          email: user.email,
          password: await Bcrypt.hash(user.password, 10),
          update_date: new Date().toISOString(),
        },
      });
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }
};

export const deleteUser = async (
  prisma: PrismaClient,
  id: number,
  logger: winston.Logger
) => {
  try {
    return await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        deleted_date: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error(error);
    return undefined;
  }
};
