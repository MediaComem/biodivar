import { Server } from '@hapi/hapi';

import { init } from '../../src/server';
import { setupConfig } from '../config/config';
import { media_test, setupMedia, dropMedia } from '../data/model/media';

import {
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia,
  onlyInLeft,
} from '../../src/controller/media-controller';
import { MediaModel } from '../../src/types/media_model';

describe('Test Media Controller', () => {
  let server: Server;

  beforeAll(async () => {
    setupConfig();
    server = await init();
  });

  afterEach(async () => {
    await dropMedia(server.app.prisma);
  });

  it('Get Media', async () => {
    await setupMedia(server.app.prisma);
    const media = await getMediaById(server.app.prisma, 2);
    expect(media).toBeDefined();
    expect(media?.media_type).toEqual('Video');
    expect(media?.url).toEqual('/specific/path');
  });

  it('Create Media', async () => {
    const media = await createMedia(
      server.app.prisma,
      media_test,
      server.app.logger
    );
    expect(media).toBeDefined();
    expect(media.media_type).toEqual('Video');
    expect(media.url).toEqual('/specific/path');
  });

  it('Update Media', async () => {
    await setupMedia(server.app.prisma);
    const getMedia = await getMediaById(server.app.prisma, 2);
    if (getMedia) {
      getMedia.media_type = 'TEST';
      const media = await updateMedia(
        server.app.prisma,
        getMedia as MediaModel,
        server.app.logger
      );
      expect(media).toBeDefined();
      expect(media.media_type).toEqual('TEST');
      expect(media.url).toEqual('/specific/path');
    }
  });

  it('Delete Media', async () => {
    await setupMedia(server.app.prisma);
    const getMedia = await getMediaById(server.app.prisma, 2);
    if (getMedia) {
      const media = await deleteMedia(
        server.app.prisma,
        getMedia as MediaModel,
        server.app.logger
      );
      expect(media).toBeDefined();
      expect(media?.deleted_date).toBeDefined();
    }
  });
});
