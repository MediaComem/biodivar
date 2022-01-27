import { ServerRoute } from "@hapi/hapi";

import { validateLogin } from "../controller/auth-controller";

export const authRoutes: ServerRoute[] = [];

authRoutes.push({
  method: "POST",
  path: "/login",
  handler: validateLogin,
  options: {
    auth: {
      mode: "try",
    },
  },
});

authRoutes.push({
  method: "GET",
  path: "/logout",
  options: {
    handler: (request, h) => {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },
});
