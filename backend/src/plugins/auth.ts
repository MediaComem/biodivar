import { Plugin, Server, Request,  } from "@hapi/hapi";

import { getUserById } from "../controller/users-controller";

const authPlugin: Plugin<null> = {
  name: "auth",
  register: async function (server: Server) {
    server.auth.strategy("session", "cookie", {
      cookie: {
        name: "sid-example",
        password: "!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6",
        isSecure: false,
      },
      redirectTo: "/login",
      validateFunc: async (request: Request, session:any) => {
        const account = await getUserById(request, session.id);

        if (!account) {
          return { valid: false };
        }

        return { valid: true, credentials: account };
      },
    });
    server.auth.default("session");
  },
};

export default authPlugin;