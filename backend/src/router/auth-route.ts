import { ServerRoute } from "@hapi/hapi";

import { validateLogin } from "../controller/auth-controller";

export const authRoutes: ServerRoute[] = [];

authRoutes.push({
  method: "GET",
  path: "/",
  handler: function (request, h) {
    return "Welcome to the restricted home page!";
  },
});

authRoutes.push({
  method: "GET",
  path: "/login",
  handler: function (request, h) {
    return ` <html>
                              <head>
                                  <title>Login page</title>
                              </head>
                              <body>
                                  <h3>Please Log In</h3>
                                  <form method="post" action="/login">
                                      Username: <input type="text" name="username"><br>
                                      Password: <input type="password" name="password"><br/>
                                  <input type="submit" value="Login"></form>
                              </body>
                          </html>`;
  },
  options: {
    auth: false,
  },
});

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
