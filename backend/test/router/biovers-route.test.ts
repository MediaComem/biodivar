import { Server } from "@hapi/hapi";

import { init } from "../../src/server";
import { setupConfig } from "../config/config";
import { setupUsers, dropUsers } from "../data/model/users";
import { setupBiovers, dropBiovers } from "../data/model/biovers";
import { BioversModel, BioversModels } from "../../src/types/biovers-model";
import { setupPoi, dropPoi } from "../data/model/poi";

describe("Test Biovers Routes", () => {
  let server: Server;

  beforeAll(async () => {
    setupConfig();
    server = await init();
    await dropPoi(server.app.prisma);
    await dropBiovers(server.app.prisma);
    await dropUsers(server.app.prisma);
    await setupUsers(server.app.prisma);
    await setupBiovers(server.app.prisma);
    await setupPoi(server.app.prisma);
  });

  afterAll(async () => {
    await dropPoi(server.app.prisma);
    await dropBiovers(server.app.prisma);
    await dropUsers(server.app.prisma);
    await server.stop();
  });

  it("Get public biovers", async () => {
    const res = await server.inject({
      method: "GET",
      url: "/api/v1/biovers",
      auth: {
        strategy: "default",
        credentials: {
          id: 1,
          password: "test",
        },
      },
    });
    const biovers = res.result as BioversModels;
    if (biovers && biovers.length > 0) {
      expect(biovers.length).toEqual(2);
      expect(biovers[0].name).toEqual("Biovers 1");
      expect(biovers[0].Poi?.length).toEqual(2);
      expect(biovers[1].name).toEqual("Biovers 2");
      expect(biovers[1].Poi?.length).toEqual(0);
    } else {
      throw new Error("No Biovers found where it should be");
    }
  });

  it("Get biovers by user", async () => {
    const res = await server.inject({
      method: "GET",
      url: "/api/v1/biovers/user?id=1",
      auth: {
        strategy: "default",
        credentials: {
          id: 1,
          password: "test",
        },
      },
    });
    const biovers = res.result as BioversModels;
    if (biovers && biovers.length > 0) {
      expect(biovers.length).toEqual(2);
      expect(biovers[0].name).toEqual("Biovers 1");
      expect(biovers[0].Poi?.length).toEqual(2);
      expect(biovers[1].name).toEqual("Biovers 3");
      expect(biovers[1].Poi?.length).toEqual(0);
    } else {
      throw new Error("No Biovers found where it should be");
    }
  });

  it("Create a biovers", async () => {
    const res = await server.inject({
      method: "POST",
      url: '/api/v1/biovers/create',
      auth: {
        strategy: "default",
        credentials: {
          id: 1,
          password: "test",
        },
      },
      payload: {
        name: "a",
        owner: 1,
      },
    });
    const biovers = res.result as BioversModel;
    expect(biovers).toBeDefined();
    expect(biovers?.name).toEqual("a");
    expect(biovers?.owner).toEqual(1);
    expect(biovers?.creation_date).toBeDefined();
    expect(biovers?.update_date).toBeNull();
    expect(biovers?.deleted_date).toBeNull();
  });

  it("Update a biovers", async () => {
    const res = await server.inject({
      method: "POST",
      url: '/api/v1/biovers/update',
      auth: {
        strategy: "default",
        credentials: {
          id: 1,
          password: "test",
        },
      },
      payload: {
        id: 1,
        name: "Test",
        owner: 1,
      },
    });
    const biovers = res.result as BioversModel;
    expect(biovers).toBeDefined();
    expect(biovers?.name).toEqual("Test");
    expect(biovers?.owner).toEqual(1);
    expect(biovers?.creation_date).toBeDefined();
    expect(biovers?.update_date).toBeDefined();
    expect(biovers?.deleted_date).toBeNull();
  });

  it("Delete a biovers", async () => {
    const biovers: BioversModel = {
      id: 1,
      name: "Biovers 1",
      owner: 1,
      creation_date: new Date(),
    }
    const res = await server.inject({
      method: "POST",
      url: `/api/v1/biovers/delete?id=1`,
      auth: {
        strategy: "default",
        credentials: {
          id: 1,
          password: "test",
        },
      },
      payload: biovers,
    });
    const deleted_biovers = res.result as BioversModel;
    expect(deleted_biovers).toBeDefined();
    expect(deleted_biovers.deleted_date).toBeDefined();
  });
});
