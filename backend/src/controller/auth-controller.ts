import { Request, ResponseToolkit } from '@hapi/hapi';
import Bcrypt from 'bcrypt';
import { User } from '@prisma/client';

import {
  getUserByName,
  getUserById,
  createUser,
} from '../controller/users-controller';
import { UserModel } from '../types/user-model';
import { successResponse, failureResponse, errorResponse } from '../utils/response';

export const validateLogin = async (request: Request, h: ResponseToolkit) => {
  const payload = request.payload as UserModel;
  const account = await getUserByName(
    request.server.app.prisma,
    payload.username
  );
  if (account && (await Bcrypt.compare(payload.password, account.password))) {
    request.cookieAuth.set({ id: account.id });
    return successResponse(h, 'Login Success', account.username);
  } else {
    return failureResponse(h, 'Login Failure');
  }
};

export const registerUser = async function (
  request: Request,
  h: ResponseToolkit
) {
  try {
    const account = (await createUser(
      request.server.app.prisma,
      request.payload as UserModel,
      request.server.app.logger
    )) as User;
    request.cookieAuth.set({ id: account.id });
    return successResponse(h, 'Registration Success', account.username);
  } catch (error) {
    if (error instanceof Error) {
      return failureResponse(h, error.message);
    } else {
      return errorResponse(h, error as string);
    }
    
  }
};

export const alreadyLogged = async (request: Request, session: any) => {
  const account = await getUserById(request.server.app.prisma, session.id);

  if (!account) {
    return { valid: false };
  }

  return { valid: true, credentials: account };
};
