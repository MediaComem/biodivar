import { PrismaClient } from "@prisma/client";
import { UserModel } from "../types/user-model";
import Bcrypt from "bcrypt";

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

export const createUser = async (prisma: PrismaClient, user: UserModel) => {
  user.creation_date = new Date();
  const password = await Bcrypt.hash(user.password, 10);
  user.password = password;
  try {
    return await prisma.user.create({
      data: user,
    });
  } catch {
    return undefined;
  }
};

export const reactivateUser = async (
  prisma: PrismaClient,
  username: string
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
  } catch {
    return undefined;
  }
};

export const updateUser = async (prisma: PrismaClient, user: UserModel) => {
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
    } catch {
      return undefined;
    }
  }
};

export const deleteUser = async (prisma: PrismaClient, id: number) => {
  try {
    return await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        deleted_date: new Date().toISOString(),
      },
    });
  } catch {
    return undefined;
  }
};
