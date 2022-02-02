import { PrismaClient, Prisma } from '@prisma/client';
import { UserModel } from '../types/user-model';
import Bcrypt from 'bcrypt';
import winston from 'winston';
import { PrismaError } from '../types/prisma-error';

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
    let errorMessage: string = '';
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const meta = error.meta as PrismaError;
        if (meta.target.length === 1) {
          errorMessage = `The ${meta.target[0]} is already used`;
        }
        else {
          errorMessage = 'The username and email are already used'
        }
        
      }
    }
    else {
      errorMessage = 'The user cannot be create for unknow reason. Please contact an administator to solve the problem';
    }
    throw new Error(errorMessage);
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
          id: +user.id,
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
  user: UserModel,
  logger: winston.Logger
) => {
  try {
    if (user && user.id) {
      return await prisma.user.update({
        where: {
          id: +user.id,
        },
        data: {
          deleted_date: new Date().toISOString(),
        },
      });
    }
    return undefined;
  } catch (error) {
    logger.error(error);
    return undefined;
  }
};
