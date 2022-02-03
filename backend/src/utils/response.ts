import { ResponseToolkit } from '@hapi/hapi';

import { Response } from '../types/response';

// {"statusCode":400,"error":"Bad Request","message":"Invalid request payload input"}

export const successResponse = (
  responseToolkit: ResponseToolkit,
  message: string,
  returnElement?: any
) => {
  return responseToolkit
    .response(
      Response.create({
        statusCode: 200,
        message: message,
        data: returnElement,
      })
    )
    .type('application/json')
    .code(200);
};

export const successWithoutContentResponse = (
    responseToolkit: ResponseToolkit,
    message: string
  ) => {
    return responseToolkit
      .response(
        Response.create({
          statusCode: 204,
          message: message,
        })
      )
      .type('application/json')
      .code(204);
  };

export const failureResponse = (
  responseToolkit: ResponseToolkit,
  message: string
) => {
  return responseToolkit
    .response(
      Response.create({
        statusCode: 400,
        error: 'Bad Request',
        message: message,
      })
    )
    .type('application/json')
    .code(400);
};

export const errorResponse = (
    responseToolkit: ResponseToolkit,
    message: string
  ) => {
    return responseToolkit
      .response(
        Response.create({
          statusCode: 500,
          error: 'Internal server error',
          message: message,
        })
      )
      .type('application/json')
      .code(500);
  };

export const NotFoundResponse = (
  responseToolkit: ResponseToolkit,
  message: string
) => {
  return responseToolkit
    .response(
      Response.create({
        statusCode: 404,
        error: 'Page Not Found',
        message: message,
      })
    )
    .type('application/json')
    .code(404);
};
