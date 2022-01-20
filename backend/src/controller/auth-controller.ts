import { Request, ResponseToolkit } from "@hapi/hapi";
import Bcrypt from "bcrypt";

import { getUserByName, getUserById } from "../controller/users-controller";
import { UserModel } from "../types/user-model";

export const validateLogin = async (request: Request, h: ResponseToolkit) => {
  const payload = request.payload as UserModel;
  const account = await getUserByName(request, payload.username);
  if (account && await Bcrypt.compare(payload.password, account.password)) {
    request.cookieAuth.set({ id: account.id });
    return h.redirect("/");
  } else {
    return h.redirect("/login");
  }
};

export const alreadyLog = async (request: Request, session: any) => {
  const account = await getUserById(request, session.id);

  if (!account) {
    return { valid: false };
  }

  return { valid: true, credentials: account };
};
