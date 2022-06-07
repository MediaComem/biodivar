import { Request, ResponseToolkit } from '@hapi/hapi';
import Bcrypt from 'bcrypt';
import generator from "generate-password";
import { User } from '@prisma/client';

import {
  getUserByNameOrEmail,
  getUserById,
  getUserByEmail,
  createUser,
  insertToken,
  changePassword,
} from '../controller/users-controller';
import { UserModel } from '../types/user-model';
import { successResponse, successWithoutContentResponse, failureResponse, errorResponse } from '../utils/response';
import { EmailModel } from '../types/email';
import { ChangePasswordInformation } from '../types/changeParsswordInformation';

export const validateLogin = async (request: Request, h: ResponseToolkit) => {
  const payload = request.payload as UserModel;
  const account = await getUserByNameOrEmail(
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

export const resetPassword = async (request: Request, h: ResponseToolkit) => {
  const account = await getUserByEmail(request.server.app.prisma, request.payload as EmailModel);

  if (!account) {
    return failureResponse(h, 'Email not found or user locked');
  }
  const token = generator.generate({
    length: 64,
    numbers: true,
    strict: true,
  });
  await insertToken(
    request.server.app.prisma,
    account.email,
    token,
    request.server.app.logger
  );
  const mailOptions = {
    from: process.env.EMAIL_MAIL,
    to: account.email,
    subject: 'BiodivAR reset password link',
    text: `${process.env.CHANGE_PASSWORD_LINK}${token}`
  };
  try {
    const result = await request.server.app.email.sendMail(mailOptions);
    console.log(result);
    return successWithoutContentResponse(h, 'Email Sent');
  } catch (error){
    console.log(error)
    return failureResponse(h, 'Email Sent');
  }
  
  
};

export const authChangePassword = async (request: Request, h: ResponseToolkit) => {
  const information = request.payload as ChangePasswordInformation;
  try {
    await changePassword(
      request.server.app.prisma,
      information.password,
      information.token,
      request.server.app.logger,
    );
    return successWithoutContentResponse(h, 'Password change successfully');
  } catch (error) {
    if (error instanceof Error) {
      return failureResponse(h, error.message);
    } else {
      return errorResponse(h, error as string);
    }
  }
};