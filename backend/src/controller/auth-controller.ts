import { Request, ResponseToolkit } from "@hapi/hapi";
import Bcrypt from "bcrypt";

import { getUserByName, getUserById } from "../controller/users-controller";
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

export const alreadyLogged = async (request: Request, session: any) => {
  const account = await getUserById(request.server.app.prisma, session.id);

  if (!account) {
    return { valid: false };
  }

  return { valid: true, credentials: account };
};
