import { Server } from "@hapi/hapi";

import { init } from "../../src/server";
import { setupConfig } from "../config/config";
import {
  getUserById,
  getUserByNameOrEmail,
  createUser,
  reactivateUser,
  updateUser,
  deleteUser,
} from "../../src/controller/users-controller";
import { setupUsers, dropUsers } from "../data/model/users";
import { UserModel } from "../../src/types/user-model";
import { User } from "@prisma/client";

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
    const existingUser = await getUserByNameOrEmail(server.app.prisma, "Rich");
    const notExistingUser = await getUserByNameOrEmail(server.app.prisma, "TEST");
    expect(existingUser?.id).toEqual(1);
    expect(notExistingUser).toBeNull();
  });

  it("Create new user", async () => {
    const user: UserModel = {
      username: "test",
      email: "test@test.test",
      password: "test",
      creation_date: new Date("2021-01-25T03:24:00"),
    };
    const newUser = await createUser(
      server.app.prisma,
      user,
      server.app.logger
    );
    if (newUser) {
      expect(newUser.id).toBeGreaterThan(0);
      expect(newUser.username).toEqual(user.username);
      expect(newUser.email).toEqual(user.email);
      expect(newUser.password).toEqual(user.password);
      expect(newUser.creation_date).toBeDefined();
      expect(newUser.update_date).toBeNull();
      expect(newUser.deleted_date).toBeNull();
    } else {
      throw new Error("User is not created");
    }
  });

  it("Update user", async () => {
    const user = await getUserById(server.app.prisma, 2);
    if (user) {
      user.username = "Update";
      const update_user = await updateUser(
        server.app.prisma,
        user as UserModel,
        server.app.logger
      ) as User;
      if (update_user && update_user) {
        expect(update_user.username).toEqual("Update");
        expect(update_user.id).toEqual(2);
        expect(update_user.update_date).toBeDefined();
      } else {
        throw new Error("User is not updated");
      }
    } else {
      throw new Error("No user to update");
    }
  });

  it("Reactivate user", async () => {
    const user = await getUserByNameOrEmail(server.app.prisma, "Roch");
    expect(user).toBeNull();
    await reactivateUser(server.app.prisma, "Roch", server.app.logger);
    const reactivate_user = await getUserByNameOrEmail(server.app.prisma, "Roch");
    expect(reactivate_user).toBeDefined();
  });

  it("Delete user", async () => {
    const user = await getUserByNameOrEmail(server.app.prisma, "Roch");
    if (user) {
      await deleteUser(server.app.prisma, user as UserModel, server.app.logger);
      const deleted_user = await getUserById(server.app.prisma, user.id);
      expect(deleted_user).toBeNull();
    }
    else {
      throw new Error("No user to delete");
    }
  });
});
