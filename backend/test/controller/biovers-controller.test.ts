import { Server } from "@hapi/hapi";

import { init } from "../../src/server";
import { setupConfig } from "../config/config";

import { setupBiovers, dropBiovers } from "../data/model/biovers";
import { setupUsers, dropUsers } from "../data/model/users";

import {
  createBiovers,
  deleteBiovers,
  getBioversByUser,
  getPublicBiovers,
  updateBiovers,
} from "../../src/controller/biovers-controller";
import { BioversModel } from "../../src/types/biovers-model";

describe("Test biovers controller", () => {
  let server: Server;

  beforeAll(async () => {
    setupConfig();
    server = await init();
    await dropBiovers(server.app.prisma);
    await dropUsers(server.app.prisma);
    await setupUsers(server.app.prisma);
    await setupBiovers(server.app.prisma);
  });

  afterAll(async () => {
    await dropBiovers(server.app.prisma);
    await dropUsers(server.app.prisma);
    await server.stop();
  });

  it("Get all biovers for a dedicated user", async () => {
    const biovers = await getBioversByUser(server.app.prisma, 1);
    expect(biovers.length).toEqual(2);
    expect(biovers[0].name).toEqual("Biovers 1");
    expect(biovers[1].name).toEqual("Biovers 3");
  });

  it("Get all biovers for a dedicated user that has no biovers", async () => {
    const biovers = await getBioversByUser(server.app.prisma, 0);
    expect(biovers.length).toEqual(0);
  });

  it("Get all public biovers", async () => {
    const biovers = await getPublicBiovers(server.app.prisma);
    expect(biovers.length).toEqual(2);
    expect(biovers[0].name).toEqual("Biovers 1");
    expect(biovers[1].name).toEqual("Biovers 2");
  });

  it("Create a biovers", async () => {
    const biovers: BioversModel = {
      name: "New Biovers",
      owner: 2,
      creation_date: new Date(),
    };
    const newBiovers = await createBiovers(server.app.prisma, biovers);
    if (newBiovers) {
      expect(newBiovers.name).toEqual(biovers.name);
      expect(newBiovers.is_public).toBeTruthy();
      expect(newBiovers.owner).toEqual(2);
      expect(newBiovers.creation_date).toEqual(biovers.creation_date);
      expect(newBiovers.update_date).toBeNull();
      expect(newBiovers.deleted_date).toBeNull();
    } else {
      throw new Error("The biovers cannot be created.");
    }
  });

  it("Update a biovers", async () => {
    const biovers: BioversModel = {
      id: 2,
      name: "Updated Biovers",
      owner: 2,
      creation_date: new Date(),
    };
    const updated_biovers = await updateBiovers(server.app.prisma, biovers);
    if (updated_biovers) {
      expect(updated_biovers.name).toEqual(biovers.name);
      expect(updated_biovers.is_public).toBeTruthy();
      expect(updated_biovers.owner).toEqual(2);
      expect(updated_biovers.update_date).toBeDefined();
      expect(updated_biovers.deleted_date).toBeNull();
    } else {
      throw new Error("The biovers cannot be updated.");
    }
  });

  it("Delete a biovers", async () => {
    const deleted_biovers = await deleteBiovers(server.app.prisma, 1);
    if (deleted_biovers) {
      expect(deleted_biovers.deleted_date).toBeDefined();
    } else {
      throw new Error("The biovers cannot be deleted.");
    }
  });
});
