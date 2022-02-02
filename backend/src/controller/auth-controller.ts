import { Request, ResponseToolkit } from "@hapi/hapi";
import Bcrypt from "bcrypt";
import { User } from "@prisma/client";

import { getUserByName, getUserById, createUser } from "../controller/users-controller";
import { UserModel } from "../types/user-model";

export const validateLogin = async (request: Request, h: ResponseToolkit) => {
  const payload = request.payload as UserModel;
  const account = await getUserByName(
    request.server.app.prisma,
    payload.username
  );
  if (account && (await Bcrypt.compare(payload.password, account.password))) {
    request.cookieAuth.set({ id: account.id });   
    return h.response({
      status: "ok",
      user: account,
    }).code(200);
  } else {
    return h.response({
      status: "ko",
    }).code(401);
  }
};

export const registerUser = async function (request: Request, h: ResponseToolkit) {
  try {
    const account = await createUser(
      request.server.app.prisma,
      request.payload as UserModel,
      request.server.app.logger
    ) as User;
    request.cookieAuth.set({ id: account.id });
    return account;
  } catch(error) {
    let errorMessage: string = '';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    else {
      errorMessage = 'The user cannot be create for unknow reason. Please contact an administator to solve the problem';
    }
    return h.response({
      errorMessage: errorMessage,
    }).code(400);
  }  
};

export const alreadyLogged = async (request: Request, session: any) => {
  const account = await getUserById(request.server.app.prisma, session.id);

  if (!account) {
    return { valid: false };
  }

  return { valid: true, credentials: account };
};
