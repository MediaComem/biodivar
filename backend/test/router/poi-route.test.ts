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
  symbol_test,
} from '../data/model/poi';
import { PoiModel } from '../../src/types/poi-model';
import { getPoiByTitle } from '../../src/controller/poi-controller';
import { Coordinate, Symbol } from '@prisma/client';

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

  it('Create a poi', async () => {
    const res = await server.inject({
      method: 'POST',
      url: `/poi/create`,
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: 'test',
        },
      },
      payload: test_poi,
    });
    const poi = res.result as PoiModel;
    expect(poi).toBeDefined();
    expect(poi.title).toEqual('POI 1');
    expect(poi.last_contributor).toEqual(1);
  });

  it('Create a poi with coordinate', async () => {
    const poi_to_create = test_poi;
    poi_to_create.coordinate = coordinate_test;
    const res = await server.inject({
      method: 'POST',
      url: `/poi/create`,
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: 'test',
        },
      },
      payload: poi_to_create,
    });
    const poi = res.result as PoiModel;
    expect(poi).toBeDefined();
    expect(poi.title).toEqual('POI 1');
    expect(poi.last_contributor).toEqual(1);
    expect(poi.coordinate?.alt).toEqual(14.4);
  });

  it('Create a poi with symbol', async () => {
    const poi_to_create = test_poi;
    poi_to_create.symbol = symbol_test;
    const res = await server.inject({
      method: 'POST',
      url: `/poi/create`,
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: 'test',
        },
      },
      payload: poi_to_create,
    });
    const poi = res.result as PoiModel;
    expect(poi).toBeDefined();
    expect(poi.title).toEqual('POI 1');
    expect(poi.last_contributor).toEqual(1);
    expect(poi.symbol?.media_type).toEqual('Video');
  });

  it('Update a poi without coordinate', async () => {
    const store_poi = await getPoiByTitle(server.app.prisma, 'POI 1');
    if (store_poi) {
      expect(store_poi?.update_date).toBeNull();
      store_poi.title = 'Update POI';
      store_poi.style_stroke_width = 255.5;
      const res = await server.inject({
        method: 'POST',
        url: `/poi/update`,
        auth: {
          strategy: 'default',
          credentials: {
            id: 1,
            password: 'test',
          },
        },
        payload: store_poi as PoiModel,
      });
      const poi = res.result as PoiModel;
      expect(poi).toBeDefined();
      expect(poi?.id).toEqual(poi.id);
      expect(poi?.title).toEqual('Update POI');
      expect(poi?.style_stroke_width).toEqual(255.5);
      expect(poi?.update_date).toBeDefined();
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
        url: `/poi/update`,
        auth: {
          strategy: 'default',
          credentials: {
            id: 1,
            password: 'test',
          },
        },
        payload: store_poi,
      });
      const poi = res.result as PoiModel;
      expect(poi).toBeDefined();
      expect(poi?.id).toEqual(poi.id);
      expect(poi?.title).toEqual('Update POI');
      expect(poi?.style_stroke_width).toEqual(255.5);
      expect(poi?.update_date).toBeDefined();
      expect(poi?.coordinate?.alt).toEqual(55.5);
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
        media_type: 'Video',
        url: '/specific/path',
        elevation_ground: 355.36,
        is_facing_user: false,
        is_visible: false,
      } as Symbol;
      const res = await server.inject({
        method: 'POST',
        url: `/poi/update`,
        auth: {
          strategy: 'default',
          credentials: {
            id: 1,
            password: 'test',
          },
        },
        payload: store_poi,
      });
      const poi = res.result as PoiModel;
      expect(poi).toBeDefined();
      expect(poi?.id).toEqual(poi.id);
      expect(poi?.style_stroke_width).toEqual(555.5);
      expect(poi?.update_date).toBeDefined();
      expect(poi.symbol?.media_type).toEqual('Video');
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
      url: `/poi/delete`,
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: 'test',
        },
      },
      payload: store_poi as PoiModel,
    });
    const poi = res.result as PoiModel;
    expect(poi).toBeDefined();
    expect(poi.title).toEqual('POI 1');
    expect(poi.deleted_date).toBeDefined();
  });
});
