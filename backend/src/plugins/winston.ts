import { Server, Plugin } from "@hapi/hapi";
import * as winston from "winston";
import "winston-daily-rotate-file";

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

const transport = new winston.transports.DailyRotateFile({
  filename: "./logs/bioversar-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  handleExceptions: true,
  maxFiles: "14d",
});

export const winstonPlugin: Plugin<null> = {
  name: "winston",
  register: async function (server: Server) {
    const logger = winston.createLogger({
      levels: levels,
      format: format,
      transports: [transport],
    });
    server.app.logger = logger;
  },
};
