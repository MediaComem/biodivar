import { Server } from "@hapi/hapi";

import { init } from "../../src/server";
import { setupConfig } from "../config/config";
import {
  getUserById,
  getUserByName,
} from "../../src/controller/users-controller";
import { setupUsers, dropUsers } from "../data/model/users";

describe("Test users controller", () => {
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

  it("Find user by ID", async () => {
    const existingUser = await getUserById(server.app.prisma, 1);
    const notExistingUser = await getUserById(server.app.prisma, 3);
    expect(existingUser?.username).toEqual("Rich");
    expect(notExistingUser).toBeNull();
  });

  it("Find user by username", async () => {
    const existingUser = await getUserByName(server.app.prisma, "Rach");
    const notExistingUser = await getUserByName(server.app.prisma, "TEST");
    expect(existingUser?.id).toEqual(2);
    expect(notExistingUser).toBeNull();
  });
});
