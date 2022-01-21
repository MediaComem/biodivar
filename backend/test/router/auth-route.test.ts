import { Server } from "@hapi/hapi";

import { init } from "../../src/server";
import { setupConfig } from "../config/config";
import { setupUsers, dropUsers } from "../data/model/users";

describe("Test server initialialization", () => {
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

  it("Redirect to login page when not authenticate", async () => {
    const res = await server.inject({
      method: "GET",
      url: "/",
    });
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual("/login");
  });

  it("Login test failed", async () => {
    const res = await server.inject({
      method: "POST",
      url: "/login",
      payload: {
        username: "Rich",
        password: "badPassword",
      },
    });
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual("/login");
  });

  it("Login test success", async () => {
    const res = await server.inject({
      method: "POST",
      url: "/login",
      payload: {
        username: "Rich",
        password: "test",
      },
    });
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual("/");
  });

  it("Test access restricted page", async () => {
    const res = await server.inject({
      method: "GET",
      url: "/",
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: "test"
        }
      }
    });
    expect(res.statusCode).toEqual(200);
  });
});
