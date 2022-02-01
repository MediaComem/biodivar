import { Server } from "@hapi/hapi";

import { init } from "../../src/server";
import { setupConfig } from "../config/config";
import { setupUsers, dropUsers } from "../data/model/users";

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
