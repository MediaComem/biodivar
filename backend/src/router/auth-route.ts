import { ServerRoute } from '@hapi/hapi';
import Joi from 'joi';

import { validateLogin } from '../controller/auth-controller';

export const authRoutes: ServerRoute[] = [];

authRoutes.push({
  method: 'GET',
  path: '/login',
  handler: function (request, h) {
    return `{'status': 'error', 'msg': 'you need to be auth to make an api request'}`;
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
      return h.redirect('/');
    },
  },
});
