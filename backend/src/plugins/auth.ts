import { Plugin, Server } from "@hapi/hapi";
import { alreadyLogged } from "../controller/auth-controller";
import 'dotenv/config';

export const authPlugin: Plugin<null> = {
  name: "auth",
  register: async function (server: Server) {
    server.auth.strategy("session", "cookie", {
      cookie: {
        name: process.env.COOKIE_NAME,
        password: process.env.COOKIE_PASSWORD,
        isSecure: process.env.COOKIE_SECURE,
      },
      redirectTo: `${process.env.URL_PREFIX}/login`,
      validateFunc: alreadyLogged,
    });
    server.auth.default("session");
  },
};
