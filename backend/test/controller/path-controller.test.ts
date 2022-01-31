import { Server } from '@hapi/hapi';
import { init } from '../../src/server';
import { setupConfig } from '../config/config';
import { setupBiovers, dropBiovers } from '../data/model/biovers';
import { setupUsers, dropUsers } from '../data/model/users';
import { test_path, setupPath, dropPath } from '../data/model/path';

import {
  createPath,
  updatePath,
  getPathsByUser,
  getPathById,
  deletePath,
} from '../../src/controller/path-controller';
import { PathModel } from '../../src/types/path-model';

describe('Test path controller', () => {
  let server: Server;

  beforeAll(async () => {
    setupConfig();
    server = await init();
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

  it('Get paths by user', async () => {
    const paths = await getPathsByUser(server.app.prisma, 1);
    expect(paths.length).toBe(1);
    expect(paths[0].style_stroke_width).toEqual(1.2);
    expect(paths[0].coordinate.length).toEqual(2);
  });

  it('Get paths by id', async () => {
    const path = await getPathById(server.app.prisma, 1);
    expect(path).toBeDefined();
    expect(path?.style_stroke_width).toEqual(1.2);
    expect(path?.coordinate.length).toEqual(2);
  });

  it('Create path', async () => {
    const new_path = await createPath(
      server.app.prisma,
      test_path,
      server.app.logger
    );
    expect(new_path).toBeDefined();
    expect(new_path?.last_contributor).toEqual(1);
    expect(new_path?.creation_date).toBeDefined();
    expect(new_path?.coordinate.length).toEqual(2);
    expect(new_path?.coordinate[0].creation_date).toBeDefined();
  });

  it('Update path', async () => {
    const paths = await getPathsByUser(server.app.prisma, 1);
    if (paths.length > 0) {
      const path = paths[0];
      path.metadata = 'This is a test';
      if (path.coordinate.length > 0) {
        path.coordinate[0].alt = 999.99;
        const new_path = await updatePath(
          server.app.prisma,
          path as PathModel,
          server.app.logger
        );
        expect(new_path).toBeDefined();
        expect(new_path?.last_contributor).toEqual(1);
        expect(new_path?.metadata).toEqual('This is a test');
        expect(new_path?.coordinate.length).toEqual(2);
        expect(new_path?.coordinate[0].alt).toEqual(999.99);
        expect(new_path?.update_date).toBeDefined();
        expect(new_path?.coordinate[0].update_date).toBeDefined();
      } else {
        throw new Error('No coordinate to update');
      }
    } else {
      throw new Error('Cannot find path to update');
    }
  });

  it('Delete path', async () => {
    const path = await getPathsByUser(server.app.prisma, 1);
    if (path) {
      const deleted_path = await deletePath(
        server.app.prisma,
        path[0] as PathModel,
        server.app.logger
      );
      expect(deleted_path).toBeDefined();
      expect(deleted_path?.coordinate.length).toEqual(2);
      expect(deleted_path?.deleted_date).toBeDefined();
      deleted_path?.coordinate.forEach((element) => {
        expect(element.deleted_date).toBeDefined();
      });
    } else {
      throw new Error('Cannot find POI to delete');
    }
  });
});
