import { Server } from '@hapi/hapi';

import { init } from '../../src/server';
import { badConfig } from '../config/config';

import {
  createMedia,
  updateMedia,
  deleteMedia
} from '../../src/controller/media-controller';

import { media_test } from '../data/model/media';
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
      await createMedia(server.app.prisma, media_test,server.app.logger);
      fail();
    } catch(error) {
      return;
    }
  })

  it('Error with update without id', async () => {
    try {
      await updateMedia(server.app.prisma, media_test,server.app.logger);
      fail();
    } catch(error) {
      return;
    }
  })

  it('Error with delete without id', async () => {
    try {
      await deleteMedia(server.app.prisma, media_test,server.app.logger);
      fail();
    } catch(error) {
      return;
    }
  })

  it('Error with update with id', async () => {
    try {
      media_test.id = 1;
      await updateMedia(server.app.prisma, media_test,server.app.logger);
      fail();
    } catch(error) {
      return;
    }
  })

  it('Error with delete with id', async () => {
    try {
      media_test.id = 1;
      await deleteMedia(server.app.prisma, media_test,server.app.logger);
      fail();
    } catch(error) {
      return;
    }
  })
});
