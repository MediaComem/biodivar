import { Server } from '@hapi/hapi';

import { init } from '../../src/server';
import { setupConfig } from '../config/config';
import { setupUsers, dropUsers } from '../data/model/users';
import { setupBiovers, dropBiovers } from '../data/model/biovers';
import {
  dropPath,
  setupPath,
  test_path,
} from '../data/model/path';
import { PathModel } from '../../src/types/path-model';
import { getPathsByUser } from '../../src/controller/path-controller';

describe('Test Path Routes', () => {
  let server: Server;

  beforeAll(async () => {
    setupConfig();
    server = await init();
  });

  beforeEach(async () => {
    await dropPath(server.app.prisma);
    await dropBiovers(server.app.prisma);
    await dropUsers(server.app.prisma);
    await setupUsers(server.app.prisma);
    await setupBiovers(server.app.prisma);
    await setupPath(server.app.prisma);
  });

  afterAll(async () => {
    await dropPath(server.app.prisma);
    await dropBiovers(server.app.prisma);
    await dropUsers(server.app.prisma);
    await server.stop();
  });

  it('Create a path', async () => {
    const res = await server.inject({
      method: 'POST',
      url: `/path/create`,
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: 'test',
        },
      },
      payload: test_path,
    });
    const new_path = res.result as PathModel;
    expect(new_path).toBeDefined();
    expect(new_path?.last_contributor).toEqual(1);
    expect(new_path?.creation_date).toBeDefined();
    expect(new_path?.coordinate?.length).toEqual(2);
  });

  it('Update a poi without coordinate', async () => {
    const store_paths = await getPathsByUser(server.app.prisma, 1);
    if (store_paths.length > 0) {
      expect(store_paths[0].update_date).toBeNull();
      store_paths[0].metadata = 'This is a test';
      store_paths[0].coordinate[0].alt = 999.99;
      const res = await server.inject({
        method: 'POST',
        url: `/path/update`,
        auth: {
          strategy: 'default',
          credentials: {
            id: 1,
            password: 'test',
          },
        },
        payload: store_paths[0] as PathModel,
      });
      const path = res.result as PathModel;
      expect(path).toBeDefined();
      expect(path?.id).toEqual(store_paths[0].id);
      expect(path?.metadata).toEqual('This is a test');
      expect(path?.update_date).toBeDefined();
      if (path.coordinate) {
        expect(path?.coordinate.length).toEqual(2);
        expect(path?.coordinate[0].alt).toEqual(999.99);
      } else {
        throw new Error('Problem with coordinates update');
      }
    } else {
      throw new Error('Cannot find POI to update');
    }
  });

  it('Delete a poi', async () => {
    const paths = await getPathsByUser(server.app.prisma, 1);
    expect(paths).toBeDefined();
    expect(paths[0].deleted_date).toBeNull();
    const res = await server.inject({
      method: 'POST',
      url: `/path/delete`,
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: 'test',
        },
      },
      payload: paths[0] as PathModel,
    });
    const path = res.result as PathModel;
    expect(path).toBeDefined();
    expect(path.deleted_date).toBeDefined();
    if (path.coordinate) {
      expect(path.coordinate.length).toEqual(2);
      path.coordinate.forEach((element) => {
        expect(element.deleted_date).toBeDefined();
      });
    }
  });
});
