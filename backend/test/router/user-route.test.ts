import { Server } from "@hapi/hapi";

import { init } from "../../src/server";
import { setupConfig } from "../config/config";
import { dropUsers, setupUsers } from "../data/model/users";
import {
  getUserById,
} from "../../src/controller/users-controller";
import { UserModel } from "../../src/types/user-model";

describe("Test User Routes", () => {
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

  it("Create a user", async () => {
    const res = await server.inject({
      method: "POST",
      url: '/api/v1/user/create',
      payload: {
        username: "a",
        email: "b",
        password: "c",
      },
    });
    const user = res.result as UserModel;
    expect(user).toBeDefined();
    expect(user?.email).toEqual("b");
    expect(user?.username).toEqual("a");
    expect(user?.creation_date).toBeDefined();
  });

  it("Update a user", async () => {
    const res = await server.inject({
      method: "POST",
      url: `/api/v1/user/update`,
      auth: {
        strategy: "default",
        credentials: {
          id: 1,
          password: "test",
        },
      },
      payload: {
        id: "2",
        username: "ddd",
        email: "bbb",
        password: "c",
      },
    });
    const updated_user = res.result as UserModel;
    expect(updated_user?.email).toEqual("bbb");
    expect(updated_user?.username).toEqual("ddd");
    expect(updated_user?.creation_date).toBeDefined();
    expect(updated_user?.update_date).toBeDefined();
  });

  it("Delete a user", async () => {
    const res = await server.inject({
      method: "POST",
      url: `/api/v1/user/delete?`,
      auth: {
        strategy: "default",
        credentials: {
          id: 1,
          password: "test",
        },
      },
      payload: {
        id: "1",
        username: "ddd",
        email: "bbb",
        password: "c",
      },
    });
    const deleted_user = await getUserById(server.app.prisma, 1);
    expect(deleted_user).toBeNull();
  });
});
