import { Server } from '@hapi/hapi';

import { init } from '../../src/server';
import { badConfig } from '../config/config';

import {
  createPath,
  updatePath,
  deletePath
} from '../../src/controller/path-controller';

import { test_path } from '../data/model/path';
import { fail } from 'assert';

describe('Test biovers controller', () => {
  let server: Server;

  beforeAll(async () => {
    badConfig();
    server = await init();
  });

  afterAll(async () => {
    await server.stop();
  });

  it('Error with create', async () => {
    try {
      await createPath(server.app.prisma, test_path,server.app.logger);
      fail();
    } catch(error) {
      return;
    }
  })

  it('Error with update without id', async () => {
    try {
      await updatePath(server.app.prisma, test_path,server.app.logger);
      fail();
    } catch(error) {
      return;
    }
  })

  it('Error with delete without id', async () => {
    try {
      await deletePath(server.app.prisma, test_path,server.app.logger);
      fail();
    } catch(error) {
      return;
    }
  })

  it('Error with update with id', async () => {
    try {
      test_path.id = 1;
      await updatePath(server.app.prisma, test_path,server.app.logger);
      fail();
    } catch(error) {
      return;
    }
  })

  it('Error with delete with id', async () => {
    try {
      test_path.id = 1;
      await deletePath(server.app.prisma, test_path,server.app.logger);
      fail();
    } catch(error) {
      return;
    }
  })
});
