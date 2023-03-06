export interface responseModel {
  statusCode: number;
  message: string;
  error?: string;
  data?: Object;
}

export class Response {
  static create(event: responseModel) {
    if (event.data) {
      return {
        statusCode: event.statusCode,
        message: event.message,
        data: event.data,
      };
    } else if (event.error) {
      return {
        statusCode: event.statusCode,
        error: event.error,
        message: event.message,
      };
    } else {
      return {
        statusCode: event.statusCode,
        message: event.message,
      };
    }
  }
}
