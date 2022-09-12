import { Server } from '@hapi/hapi';

import { init } from '../../src/server';
import { setupConfig } from '../config/config';
import { setupUsers, dropUsers } from '../data/model/users';
import { setupBiovers, dropBiovers } from '../data/model/biovers';
import {
  dropPoi,
  setupPoi,
  test_poi,
  coordinate_test,
} from '../data/model/poi';
import { symbol_test } from '../data/model/symbol';
import { PoiModel, PoiModels } from '../../src/types/poi-model';
import { getPoiByTitle } from '../../src/controller/poi-controller';
import { Coordinate, Symbol } from '@prisma/client';
import { responseModel } from '../../src/types/response';

describe('Test Poi Routes', () => {
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

  it("Get POI by title", async () => {
    const res = await server.inject({
      method: "GET",
      url: "/api/v1/poi/title?title=POI 1",
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
      const poi = response.data as PoiModel;
      expect(poi.title).toEqual('POI 1');
    } else {
      throw new Error("No Biovers found where it should be");
    }
  });

  it("Get POI by ID", async () => {
    const res = await server.inject({
      method: "GET",
      url: "/api/v1/poi/id?id=1",
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
      const poi = response.data as PoiModel;
      expect(poi.title).toEqual('POI 1');
    } else {
      throw new Error("No Biovers found where it should be");
    }
  });

  it('Create a poi', async () => {
    const res = await server.inject({
      method: 'POST',
      url: `/api/v1/poi/create`,
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: 'test',
        },
      },
      payload: test_poi,
    });
    const response = res.result as responseModel;
    if (response && response.data) {
      expect(response.statusCode).toEqual(200);
      const poi = response.data as PoiModel;
      expect(poi).toBeDefined();
      expect(poi.title).toEqual('POI 1');
      expect(poi.last_contributor).toEqual(1);
    } else {
      throw new Error('Cannot create the POI');
    }
  });

  it('Create a poi with coordinate', async () => {
    const poi_to_create = test_poi;
    poi_to_create.coordinate = coordinate_test;
    const res = await server.inject({
      method: 'POST',
      url: `/api/v1/poi/create`,
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: 'test',
        },
      },
      payload: poi_to_create,
    });
    const response = res.result as responseModel;
    if (response && response.data) {
      expect(response.statusCode).toEqual(200);
      const poi = response.data as PoiModel;
      expect(poi).toBeDefined();
      expect(poi.title).toEqual('POI 1');
      expect(poi.last_contributor).toEqual(1);
      expect(poi.coordinate?.alt).toEqual(14.4);
    } else {
      throw new Error('Cannot create the POI with coordinate');
    }
  });

  it('Create a poi with symbol', async () => {
    const poi_to_create = test_poi;
    poi_to_create.symbol = symbol_test;
    const res = await server.inject({
      method: 'POST',
      url: `/api/v1/poi/create`,
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: 'test',
        },
      },
      payload: poi_to_create,
    });
    const response = res.result as responseModel;
    if (response && response.data) {
      expect(response.statusCode).toEqual(200);
      const poi = response.data as PoiModel;
      expect(poi).toBeDefined();
      expect(poi.title).toEqual('POI 1');
      expect(poi.last_contributor).toEqual(1);
      expect(poi.symbol?.media_type).toEqual('Video');
    } else {
      throw new Error('Cannot create the POI with symbol');
    }
  });

  it('Create multiple pois', async () => {
    const res = await server.inject({
      method: 'POST',
      url: `/api/v1/poi/creates`,
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: 'test',
        },
      },
      payload: [test_poi, test_poi],
    });
    const response = res.result as responseModel;
    if (response && response.data) {
      expect(response.statusCode).toEqual(200);
      expect(Array.isArray(response.data)).toBe(true);
      const data = response.data as PoiModels;
      data.forEach((poi) => {
        expect(poi).toBeDefined();
        expect(poi.title).toEqual('POI 1');
        expect(poi.last_contributor).toEqual(1);
      })
    } else {
      throw new Error('Cannot create the POI');
    }
  });

  it('Update a poi without coordinate', async () => {
    const store_poi = await getPoiByTitle(server.app.prisma, 'POI 1');
    if (store_poi) {
      expect(store_poi?.update_date).toBeNull();
      store_poi.title = 'Update POI';
      store_poi.style_stroke_width = 255.5;
      const res = await server.inject({
        method: 'POST',
        url: `/api/v1/poi/update`,
        auth: {
          strategy: 'default',
          credentials: {
            id: 1,
            password: 'test',
          },
        },
        payload: store_poi as PoiModel,
      });
      const response = res.result as responseModel;
      if (response && response.data) {
        expect(response.statusCode).toEqual(200);
        const poi = response.data as PoiModel;
        expect(poi).toBeDefined();
        expect(poi?.id).toEqual(poi.id);
        expect(poi?.title).toEqual('Update POI');
        expect(poi?.style_stroke_width).toEqual(255.5);
        expect(poi?.update_date).toBeDefined();
      } else {
        throw new Error('Cannot update POI');
      }
    } else {
      throw new Error('Cannot find POI to update');
    }
  });

  it('Update a poi with coordinate', async () => {
    const store_poi = await getPoiByTitle(server.app.prisma, 'POI 1');
    if (store_poi) {
      expect(store_poi?.update_date).toBeNull();
      store_poi.title = 'Update POI';
      store_poi.style_stroke_width = 255.5;
      store_poi.coordinate = {
        lat: 33.3,
        long: 44.4,
        alt: 55.5,
      } as Coordinate;
      const res = await server.inject({
        method: 'POST',
        url: `/api/v1/poi/update`,
        auth: {
          strategy: 'default',
          credentials: {
            id: 1,
            password: 'test',
          },
        },
        payload: store_poi,
      });
      const response = res.result as responseModel;
      if (response && response.data) {
        expect(response.statusCode).toEqual(200);
        const poi = response.data as PoiModel;
        expect(poi).toBeDefined();
        expect(poi?.id).toEqual(poi.id);
        expect(poi?.title).toEqual('Update POI');
        expect(poi?.style_stroke_width).toEqual(255.5);
        expect(poi?.update_date).toBeDefined();
        expect(poi?.coordinate?.alt).toEqual(55.5);
      } else {
        throw new Error('Cannot update POI with coordinate');
      }
    } else {
      throw new Error('Cannot find POI to update');
    }
  });

  it('Update a poi with symbol', async () => {
    const store_poi = await getPoiByTitle(server.app.prisma, 'POI 1');
    if (store_poi) {
      expect(store_poi?.update_date).toBeNull();
      expect(store_poi?.symbol).toBeNull();
      store_poi.style_stroke_width = 555.5;
      store_poi.symbol = {
        id: 3333333333,
        poi_id: 3333333333,
        media_type: 'Video',
        url: '/specific/path',
        elevation_ground: 355.36,
        is_facing_user: false,
        is_visible: false,
        ar_url: 'fdasfsd',
        media_type_ar: 'fdafsf',
        autoplay: false,
        amplitude: 1.1,
        audio_autoplay: false,
        audio_distance: 33,
        audio_loop: false,
        audio_url: 'fasfsaf',
        wireframe: false,
        scale: 33,
        loop: true,
        is_visible_ar: true,
        media_type_audio: 'fdasf',
        update_date: null,
        deleted_date: null,
        creation_date: new Date(),
      } as Symbol;
      const res = await server.inject({
        method: 'POST',
        url: `/api/v1/poi/update`,
        auth: {
          strategy: 'default',
          credentials: {
            id: 1,
            password: 'test',
          },
        },
        payload: store_poi,
      });
      const response = res.result as responseModel;
      if (response && response.data) {
        expect(response.statusCode).toEqual(200);
        const poi = response.data as PoiModel;
        expect(poi).toBeDefined();
        expect(poi?.id).toEqual(poi.id);
        expect(poi?.style_stroke_width).toEqual(555.5);
        expect(poi?.update_date).toBeDefined();
        expect(poi.symbol?.media_type).toEqual('Video');
      } else {
        throw new Error('Cannot update POI with symbol');
      }
    } else {
      throw new Error('Cannot find POI to update');
    }
  });

  it('Delete a poi', async () => {
    const store_poi = await getPoiByTitle(server.app.prisma, 'POI 1');
    expect(store_poi).toBeDefined();
    expect(store_poi?.deleted_date).toBeNull();
    const res = await server.inject({
      method: 'POST',
      url: `/api/v1/poi/delete`,
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: 'test',
        },
      },
      payload: store_poi as PoiModel,
    });
    const response = res.result as responseModel;
    if (response && response.data) {
      expect(response.statusCode).toEqual(200);
      const poi = response.data as PoiModel;
      expect(poi).toBeDefined();
      expect(poi.title).toEqual('POI 1');
      expect(poi.deleted_date).toBeDefined();
    } else {
      throw new Error('Cannot delete POI');
    }
  });
});
