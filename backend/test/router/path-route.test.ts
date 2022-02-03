import { Server } from '@hapi/hapi';

import { init } from '../../src/server';
import { setupConfig } from '../config/config';
import { setupUsers, dropUsers } from '../data/model/users';
import { setupBiovers, dropBiovers } from '../data/model/biovers';
import { dropPath, setupPath, test_path } from '../data/model/path';
import { PathModel, PathModels } from '../../src/types/path-model';
import { getPathsByUser } from '../../src/controller/path-controller';
import { responseModel } from '../../src/types/response';

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

  it('Get Path by id', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/api/v1/path/id?id=1',
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: 'test',
        },
      },
    });
    const response = res.result as responseModel;
    expect(response.statusCode).toEqual(200);
    if (response && response.data) {
      const path = response.data as PathModel;
      expect(path.style_stroke_width).toEqual(1.2);
      if (path.coordinate) {
        expect(path.coordinate.length).toEqual(2);
      } else {
        throw new Error('Cannot load fully the path, coordiantes are missing');
      }
    } else {
      throw new Error('No Path found where it should be');
    }
  });

  it('Get Path by user', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/api/v1/path/user?user=1',
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: 'test',
        },
      },
    });
    const response = res.result as responseModel;
    expect(response.statusCode).toEqual(200);
    if (response && response.data) {
      const paths = response.data as PathModels;
      expect(paths[0].style_stroke_width).toEqual(1.2);
      if (paths[0].coordinate) {
        expect(paths[0].coordinate.length).toEqual(2);
      } else {
        throw new Error('Cannot load fully the path, coordiantes are missing');
      }
    } else {
      throw new Error('No Path found where it should be');
    }
  });

  it('Create a path', async () => {
    const res = await server.inject({
      method: 'POST',
      url: `/api/v1/path/create`,
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: 'test',
        },
      },
      payload: test_path,
    });
    const response = res.result as responseModel;
    expect(response.statusCode).toEqual(200);
    if (response && response.data) {
      const path = response.data as PathModel;
      expect(path).toBeDefined();
      expect(path?.last_contributor).toEqual(1);
      expect(path?.creation_date).toBeDefined();
      expect(path?.coordinate?.length).toEqual(2);
    } else {
      throw new Error('No Path found where it should be');
    }
  });

  it('Update a path without coordinate', async () => {
    const store_paths = await getPathsByUser(server.app.prisma, 1);
    if (store_paths.length > 0) {
      expect(store_paths[0].update_date).toBeNull();
      store_paths[0].metadata = 'This is a test';
      store_paths[0].coordinate[0].alt = 999.99;
      const res = await server.inject({
        method: 'POST',
        url: `/api/v1/path/update`,
        auth: {
          strategy: 'default',
          credentials: {
            id: 1,
            password: 'test',
          },
        },
        payload: store_paths[0] as PathModel,
      });
      const response = res.result as responseModel;
      expect(response.statusCode).toEqual(200);
      if (response && response.data) {
        const path = response.data as PathModel;
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
        throw new Error('Cannot update the Path');
      }
    } else {
      throw new Error('Cannot find Path to update');
    }
  });

  it('Delete a path', async () => {
    const paths = await getPathsByUser(server.app.prisma, 1);
    expect(paths).toBeDefined();
    expect(paths[0].deleted_date).toBeNull();
    const res = await server.inject({
      method: 'POST',
      url: `/api/v1/path/delete`,
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: 'test',
        },
      },
      payload: paths[0] as PathModel,
    });
    const response = res.result as responseModel;
    expect(response.statusCode).toEqual(200);
    if (response && response.data) {
      const path = response.data as PathModel;
      expect(path).toBeDefined();
      expect(path.deleted_date).toBeDefined();
      if (path.coordinate) {
        expect(path.coordinate.length).toEqual(2);
        path.coordinate.forEach((element) => {
          expect(element.deleted_date).toBeDefined();
        });
      } else {
        throw new Error('Problem with coordinates update');
      }
    } else {
      throw new Error('Cannot delete the Path');
    }
  });
});
