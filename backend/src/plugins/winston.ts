import { Plugin, Server } from "@hapi/hapi";
import winston from "winston";

declare module "@hapi/hapi" {
  interface ServerApplicationState {
    logger: winston.Logger;
  }
}

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const transports = [
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  new winston.transports.File({ filename: "logs/all.log" }),
];

export const winstonPlugin: Plugin<null> = {
  name: "winston",
  register: async function (server: Server) {
    const logger = winston.createLogger({
      levels: levels,
      format: format,
      transports: transports,
    });
    server.app.logger = logger;
  },
};
