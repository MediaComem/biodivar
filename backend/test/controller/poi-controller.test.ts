import { Server } from "@hapi/hapi";
import {
  createPoi,
  deletePoi,
  getPoiByTitle,
  updatePoi,
} from "../../src/controller/poi-controller";

import { init } from "../../src/server";
import { PoiModel } from "../../src/types/poi-model";
import { setupConfig } from "../config/config";
import { setupBiovers, dropBiovers } from "../data/model/biovers";
import {
  setupPoi,
  dropPoi,
  test_poi,
  coordinate_test,
} from "../data/model/poi";
import { setupUsers, dropUsers } from "../data/model/users";

describe("Test poi controller", () => {
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

  it("Create poi", async () => {
    const new_poi = await createPoi(
      server.app.prisma,
      test_poi,
      server.app.logger
    );
    expect(new_poi).toBeDefined();
    expect(new_poi?.title).toEqual("POI 1");
    expect(new_poi?.last_contributor).toEqual(1);
  });

  it("Create poi with coordinate", async () => {
    const poi = test_poi;
    poi.coordinate = coordinate_test;
    const new_poi = await createPoi(
      server.app.prisma,
      test_poi,
      server.app.logger
    );
    expect(new_poi).toBeDefined();
    expect(new_poi?.title).toEqual("POI 1");
    expect(new_poi?.last_contributor).toEqual(1);
  });

  it("Update poi", async () => {
    const poi = await getPoiByTitle(server.app.prisma, "POI 1");
    if (poi) {
      poi.title = "Update POI";
      poi.style_stroke_width = 255.5;
      const update_poi = await updatePoi(
        server.app.prisma,
        poi as PoiModel,
        server.app.logger
      );
      expect(update_poi).toBeDefined();
      expect(update_poi?.id).toEqual(poi.id);
      expect(update_poi?.title).toEqual("Update POI");
      expect(update_poi?.style_stroke_width).toEqual(255.5);
      expect(update_poi?.update_date).toBeDefined();
    } else {
      throw new Error("Cannot find POI to update");
    }
  });

  it("Update poi and create coordinate", async () => {
    const poi = (await getPoiByTitle(server.app.prisma, "POI 1")) as PoiModel;
    if (poi) {
      expect(poi.coordinate).toBeNull();
      poi.title = "Update POI";
      poi.style_stroke_width = 255.5;
      poi.coordinate = {
        lat: 33.3,
        long: 44.4,
        alt: 55.5,
      };
      const update_poi = await updatePoi(
        server.app.prisma,
        poi,
        server.app.logger
      );
      expect(update_poi).toBeDefined();
      expect(update_poi?.id).toEqual(poi.id);
      expect(update_poi?.title).toEqual("Update POI");
      expect(update_poi?.style_stroke_width).toEqual(255.5);
      expect(update_poi?.update_date).toBeDefined();
      expect(update_poi?.coordinate?.alt).toEqual(55.5);
    } else {
      throw new Error("Cannot find POI to update");
    }
  });

  it("Update poi and update coordinate", async () => {
    const poi = (await getPoiByTitle(server.app.prisma, "POI 1")) as PoiModel;
    if (poi) {
      expect(poi.coordinate).toBeNull();
      poi.title = "Update POI";
      poi.style_stroke_width = 255.5;
      poi.coordinate = {
        lat: 33.3,
        long: 44.4,
        alt: 55.5,
      };
      const update_poi = await updatePoi(
        server.app.prisma,
        poi,
        server.app.logger
      );
      expect(update_poi).toBeDefined();
      expect(update_poi?.id).toEqual(poi.id);
      expect(update_poi?.title).toEqual("Update POI");
      expect(update_poi?.style_stroke_width).toEqual(255.5);
      expect(update_poi?.update_date).toBeDefined();
      expect(update_poi?.coordinate?.alt).toEqual(55.5);
    } else {
      throw new Error("Cannot find POI to update");
    }
  });

  it("Delete poi", async () => {
    const poi = await getPoiByTitle(server.app.prisma, "POI 1");
    if (poi) {
      const deleted_poi = await deletePoi(
        server.app.prisma,
        poi as PoiModel,
        server.app.logger
      );
      expect(deleted_poi).toBeDefined();
      expect(deleted_poi?.title).toEqual("POI 1");
      expect(deleted_poi?.deleted_date).toBeDefined();
    } else {
      throw new Error("Cannot find POI to delete");
    }
  });
});
