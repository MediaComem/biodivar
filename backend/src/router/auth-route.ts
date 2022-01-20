import { ServerRoute } from "@hapi/hapi";
import { getUserByName } from "../controller/users-controller";
import { UserModel } from "../types/user-model";

const authRoutes: ServerRoute[] = [];

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
  handler: async (request, h) => {
    const payload = request.payload as UserModel;
    const account = await getUserByName(request, payload.username);
    if (account && account.password === payload.password) {
      request.cookieAuth.set({ id: account.id });
      return h.redirect("/");
    } else {
      return h.redirect("/login");
    }
  },
  options: {
    auth: {
      mode: "try",
    },
  },
});

export default authRoutes;
