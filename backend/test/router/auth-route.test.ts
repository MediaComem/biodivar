import { Server } from "@hapi/hapi";

import { init } from "../../src/server";
import { setupConfig } from "../config/config";
import { setupUsers, dropUsers } from "../data/model/users";
import { responseModel } from "../../src/types/response";

import {
  getUserById,
} from "../../src/controller/users-controller";

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
    const response = res.result as responseModel;
    expect(response.statusCode).toEqual(400);
    expect(response.error).toEqual("Bad Request");
    expect(response.message).toEqual("Login Failure");
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
    const response = res.result as responseModel;
    expect(response).toBeDefined();
    expect(response.data).toEqual("a");
    expect(response.statusCode).toEqual(200);
    expect(response.message).toEqual("Registration Success");
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

  it ('change password', async () => {
    const before = await getUserById(server.app.prisma, 1);
    const res = await server.inject({
      method: "POST",
      url: "/api/v1/change-password",
      payload: {
        password: "aaaabbbb",
        toker: "abcd",
      },
    });
    expect(res.statusCode).toEqual(204);
    const user = await getUserById(server.app.prisma, 1);
    expect(user?.password).not.toEqual(before?.password);
  })
});
