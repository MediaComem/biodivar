import { Plugin, Server } from "@hapi/hapi";
import { alreadyLog } from "../controller/auth-controller";

export const authPlugin: Plugin<null> = {
  name: "auth",
  register: async function (server: Server) {
    server.auth.strategy("session", "cookie", {
      cookie: {
        name: "sid-example",
        password: "!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6",
        isSecure: false,
      },
      redirectTo: "/login",
      validateFunc: alreadyLog,
    });
    server.auth.default("session");
  },
};
