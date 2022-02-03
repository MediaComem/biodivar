import { ServerRoute } from '@hapi/hapi';
import Joi from 'joi';

import { validateLogin, registerUser } from '../controller/auth-controller';
import { successResponse, failureResponse } from "../utils/response";

export const authRoutes: ServerRoute[] = [];

authRoutes.push({
  method: 'POST',
  path: '/register',
  options: {
    validate: {
      payload: Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
      }),
    },
    handler: registerUser,
    auth: {
      mode: 'try',
    },
  },
});

authRoutes.push({
  method: 'GET',
  path: '/login',
  handler: function (request, h) {
    if (request.auth.isAuthenticated) {
      return successResponse(h, 'Login Success');
    } else {
      return failureResponse(h, 'You need to be auth to make an api request')
    }
  },
  options: {
    auth: {
      mode: 'try',
    },
  },
});

authRoutes.push({
  method: 'POST',
  path: '/login',
  options: {
    validate: {
      payload: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
    },
    handler: validateLogin,
    auth: {
      mode: 'try',
    },
  },
});

authRoutes.push({
  method: 'GET',
  path: '/logout',
  options: {
    handler: (request, h) => {
      request.cookieAuth.clear();
      return successResponse(h, 'Logout Success');
    },
  },
});
