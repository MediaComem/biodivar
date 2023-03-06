import { Server } from "@hapi/hapi";

import { init } from "../../src/server";
import { setupConfig } from "../config/config";
import { setupUsers, dropUsers } from "../data/model/users";
import { setupBiovers, dropBiovers } from "../data/model/biovers";
import { BioversModel, BioversModels } from "../../src/types/biovers-model";
import { setupPoi, dropPoi } from "../data/model/poi";
import { responseModel } from "../../src/types/response";

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

  /*it("Get public biovers", async () => {
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
    const response = res.result as responseModel; 
    if (response && response.data) {
      const biovers = response.data as BioversModels;
      expect(biovers.length).toEqual(2);
      expect(biovers[0].name).toEqual("Biovers 1");
      expect(biovers[0].Poi?.length).toEqual(2);
      expect(biovers[1].name).toEqual("Biovers 2");
      expect(biovers[1].Poi?.length).toEqual(0);
    } else {
      throw new Error("No Biovers found where it should be");
    }
  });*/

  /* TODO: Check how to set the request state to give the user id
  it("Get biovers by user", async () => {
    const res = await server.inject({
      method: "GET",
      url: "/api/v1/biovers/user",
      auth: {
        strategy: "default",
        credentials: {
          id: 1,
          password: "test",
        },
      },
    });
    const response = res.result as responseModel;
    expect(response.statusCode).toEqual(200);
    if (response && response.data) {
      const biovers = response.data as BioversModels;
      expect(biovers.length).toEqual(2);
      expect(biovers[0].name).toEqual("Biovers 1");
      expect(biovers[0].Poi?.length).toEqual(2);
      expect(biovers[1].name).toEqual("Biovers 3");
      expect(biovers[1].Poi?.length).toEqual(0);
    } else {
      throw new Error("No Biovers found where it should be");
    }
  });
  */

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
    const response = res.result as responseModel;
    if (response && response.data) {
      expect(response.statusCode).toEqual(200);
      const biovers = response.data as BioversModel;
      expect(biovers).toBeDefined();
      expect(biovers?.name).toEqual("a");
      expect(biovers?.owner).toEqual(1);
      expect(biovers?.creation_date).toBeDefined();
      expect(biovers?.update_date).toBeNull();
      expect(biovers?.deleted_date).toBeNull();
    }
    else {
      throw new Error("Cannot create the biovers");
    }
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
    const response = res.result as responseModel;
    if (response && response.data) {
      expect(response.statusCode).toEqual(200);
      const biovers = response.data as BioversModel;
      expect(biovers).toBeDefined();
      expect(biovers?.name).toEqual("Test");
      expect(biovers?.owner).toEqual(1);
      expect(biovers?.creation_date).toBeDefined();
      expect(biovers?.update_date).toBeDefined();
      expect(biovers?.deleted_date).toBeNull();
    }
    else {
      throw new Error("Cannot update the biovers");
    }
    
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
    const response = res.result as responseModel;
    if (response && response.data) {
      expect(response.statusCode).toEqual(200);
      const biovers = response.data as BioversModel;
      expect(biovers).toBeDefined();
      expect(biovers.deleted_date).toBeDefined();
    }
    else {
      throw new Error("Cannot delete the biovers");
    }
  });
});
