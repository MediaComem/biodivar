import { Server } from "@hapi/hapi";

import { init } from "../../src/server";
import { setupConfig } from "../config/config";
import { setupUsers, dropUsers } from "../data/model/users";
import { setupBiovers, dropBiovers } from "../data/model/biovers";
import { dropPoi, setupPoi, test_poi } from "../data/model/poi";
import { PoiModel } from "../../src/types/poi-model";
import { getPoiByTitle } from "../../src/controller/poi-controller";

describe("Test Poi Routes", () => {
  let server: Server;

  beforeAll(async () => {
    setupConfig();
    server = await init();
  });

  beforeEach(async () => {
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

  it("Create a biovers", async () => {
    const res = await server.inject({
      method: "POST",
      url: `/poi/create?poi=${JSON.stringify(test_poi)}`,
      auth: {
        strategy: "default",
        credentials: {
          id: 1,
          password: "test",
        },
      },
    });
    const poi = res.result as PoiModel;
    expect(poi).toBeDefined();
    expect(poi.title).toEqual("POI 1");
    expect(poi.last_contributor).toEqual(1);
  });

  it("Update a biovers", async () => {
    const store_poi = await getPoiByTitle(server.app.prisma, "POI 1");
    if (store_poi) {
      expect(store_poi?.update_data).toBeNull();
      store_poi.title = "Update POI";
      store_poi.style_stroke_width = 255.5;
      const res = await server.inject({
        method: "POST",
        url: `/poi/update?poi=${JSON.stringify(store_poi)}`,
        auth: {
          strategy: "default",
          credentials: {
            id: 1,
            password: "test",
          },
        },
      });
      const poi = res.result as PoiModel;
      expect(poi).toBeDefined();
      expect(poi?.id).toEqual(poi.id);
      expect(poi?.title).toEqual("Update POI");
      expect(poi?.style_stroke_width).toEqual(255.5);
      expect(poi?.update_data).toBeDefined();
    } else {
      throw new Error("Cannot find POI to update");
    }
  });

  it("Delete a biovers", async () => {
    const store_poi = await getPoiByTitle(server.app.prisma, "POI 1");
    expect(store_poi).toBeDefined();
    expect(store_poi?.deleted_date).toBeNull();
    const res = await server.inject({
      method: "POST",
      url: `/poi/delete?id=${store_poi?.id}`,
      auth: {
        strategy: "default",
        credentials: {
          id: 1,
          password: "test",
        },
      },
    });
    const poi = res.result as PoiModel;
    expect(poi).toBeDefined();
    expect(poi.title).toEqual("POI 1");
    expect(poi.deleted_date).toBeDefined();
  });
});
