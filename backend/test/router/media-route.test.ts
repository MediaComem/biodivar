import { Server } from '@hapi/hapi';

import { init } from '../../src/server';
import { setupConfig } from '../config/config';
import { setupMedia, dropMedia, media_test } from '../data/model/media';
import { MediaModel } from '../../src/types/media_model';
import { responseModel } from '../../src/types/response';
import { getMediaById } from '../../src/controller/media-controller';

describe('Test Media Routes', () => {
  let server: Server;

  beforeAll(async () => {
    setupConfig();
    server = await init();
  });

  afterEach(async () => {
    await dropMedia(server.app.prisma);
  });

  afterAll(async () => {
    await server.stop();
  });

  it('Get a Media', async () => {
    await setupMedia(server.app.prisma);
    const res = await server.inject({
      method: 'GET',
      url: '/api/v1/media/id?id=2',
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: 'test',
        },
      },
      payload: media_test,
    });
    const response = res.result as responseModel;
    if (response && response.data) {
      expect(response.statusCode).toEqual(200);
      const media = response.data as MediaModel;
      expect(media).toBeDefined();
      expect(media?.media_type).toEqual('Video');
      expect(media?.url).toEqual('/specific/path');
    } else {
      throw new Error('Cannot get the Media');
    }
  });

  /*
  it('Create a Media', async () => {
    const res = await server.inject({
      method: 'POST',
      url: `/api/v1/media/create`,
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: 'test',
        },
      },
      payload: media_test,
    });
    const response = res.result as responseModel;
    if (response && response.data) {
      expect(response.statusCode).toEqual(200);
      const media = response.data as MediaModel;
      expect(media).toBeDefined();
      expect(media.media_type).toEqual('Video');
      expect(media.url).toEqual('/specific/path');
    } else {
      throw new Error('Cannot create the Media');
    }
  });*/

  it('Update a Media', async () => {
    await setupMedia(server.app.prisma);
    const getMedia = await getMediaById(server.app.prisma, 2);
    if (getMedia) {
      getMedia.media_type = 'TEST';
      const res = await server.inject({
        method: 'POST',
        url: `/api/v1/media/update`,
        auth: {
          strategy: 'default',
          credentials: {
            id: 1,
            password: 'test',
          },
        },
        payload: getMedia as MediaModel,
      });
      const response = res.result as responseModel;
      if (response && response.data) {
        expect(response.statusCode).toEqual(200);
        const media = response.data as MediaModel;
        expect(media).toBeDefined();
        expect(media.media_type).toEqual('TEST');
        expect(media.url).toEqual('/specific/path');
      } else {
        throw new Error('Cannot update the Media');
      }
    } else {
      throw new Error('Cannot update a Media');
    }
  });

  it('Delete a Media', async () => {
    await setupMedia(server.app.prisma);
    const getMedia = await getMediaById(server.app.prisma, 2);
    if (getMedia) {
      const res = await server.inject({
        method: 'POST',
        url: `/api/v1/media/delete`,
        auth: {
          strategy: 'default',
          credentials: {
            id: 1,
            password: 'test',
          },
        },
        payload: getMedia as MediaModel,
      });
      const response = res.result as responseModel;
      if (response && response.data) {
        expect(response.statusCode).toEqual(200);
        const media = response.data as MediaModel;
        expect(media).toBeDefined();
        expect(media.deleted_date).toBeDefined();
      } else {
        throw new Error('Cannot delete the Media');
      }
    } else {
      throw new Error('Cannot delete a Media');
    }
  });
});
