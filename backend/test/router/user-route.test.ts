import { Server } from "@hapi/hapi";

import { init } from "../../src/server";
import { setupConfig } from "../config/config";
import { dropUsers, setupUsers } from "../data/model/users";
import {
  getUserById,
} from "../../src/controller/users-controller";
import { UserModel } from "../../src/types/user-model";
import { responseModel } from "../../src/types/response";

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
    const response = res.result as responseModel
    if (response && response.data) {
      expect(response.statusCode).toEqual(200);
      const user = response.data as UserModel;
      expect(user.email).toEqual("bbb");
      expect(user.username).toEqual("ddd");
      expect(user?.creation_date).toBeDefined();
      expect(user?.update_date).toBeDefined();
    }
    else {
      throw new Error("Cannot update the user");
    }
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
    const response = res.result as responseModel
    if (response && response.data) {
      expect(response.statusCode).toEqual(200);
      const user = response.data as UserModel;
      expect(user.id).toEqual(1);
      expect(user.deleted_date).toBeDefined();
    }
    else {
      throw new Error("Cannot delete the user");
    }
  });
});
