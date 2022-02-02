import { Server } from "@hapi/hapi";

import { init } from "../../src/server";
import { setupConfig } from "../config/config";
import { setupUsers, dropUsers } from "../data/model/users";
import { UserModel } from "../../src/types/user-model";

describe("Test Auth Routes", () => {
  let server: Server;

  beforeAll(async () => {
    setupConfig();
    server = await init();
    await dropUsers(server.app.prisma);
    await setupUsers(server.app.prisma);
  });

  afterAll(async () => {
    await dropUsers(server.app.prisma);
    await server.stop();
  });

  it("Login test failed", async () => {
    const res = await server.inject({
      method: "POST",
      url: "/api/v1/login",
      payload: {
        username: "Rich",
        password: "badPassword",
      },
    });
    expect(res.statusCode).toEqual(401);
  });

  it("Register a user", async () => {
    const res = await server.inject({
      method: "POST",
      url: '/api/v1/register',
      payload: {
        username: "a",
        email: "bbbbbb@gmail.com",
        password: "cccc",
      },
    });
    const user = res.result as UserModel;
    expect(user).toBeDefined();
    expect(user?.email).toEqual("bbbbbb@gmail.com");
    expect(user?.username).toEqual("a");
    expect(user?.creation_date).toBeDefined();
  });

  it("Login test success", async () => {
    const res = await server.inject({
      method: "POST",
      url: "/api/v1/login",
      payload: {
        username: "Rich",
        password: "test",
      },
    });
    expect(res.statusCode).toEqual(200);
  });
});
