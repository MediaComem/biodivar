import { Server } from '@hapi/hapi';

import { init } from '../../src/server';
import { setupConfig } from '../config/config';
import { setupUsers, dropUsers } from '../data/model/users';
import { setupEvent, dropEvent, event } from '../data/model/event';
import { setupBiovers, dropBiovers } from '../data/model/biovers';
import { EventModel } from '../../src/types/event-model';
import { responseModel } from '../../src/types/response';
import { CoordinateModel } from '../../src/types/coordinate-model';

describe('Test User Trace Controller', () => {
  let server: Server;

  beforeAll(async () => {
    setupConfig();
    server = await init();
  });

  beforeEach(async () => {
    await dropEvent(server.app.prisma);
    await dropBiovers(server.app.prisma);
    await dropUsers(server.app.prisma);
    await setupUsers(server.app.prisma);
    await setupBiovers(server.app.prisma);
    await setupEvent(server.app.prisma);
  });

  afterAll(async () => {
    await dropEvent(server.app.prisma);
    await dropBiovers(server.app.prisma);
    await dropUsers(server.app.prisma);
    await server.stop();
  });

  it('Create user trace', async () => {
    const coordinate: CoordinateModel = {
      lat: 12.2,
      long: 13.3,
      alt: 14.4,
    };
    const newEvent: EventModel = {
        author: 1,
        biovers: 1,
        coordinate: coordinate,
        gps_accuracy: 11.2,
        data: '{Event: "Open Biovers"}',
    };
    const res = await server.inject({
      method: 'POST',
      url: '/api/v1/event/create',
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: 'test',
        },
      },
      payload: newEvent,
    });
    const response = res.result as responseModel;
    if (response && response.data) {
        const newStoredEvent = response.data as EventModel;
        expect(newStoredEvent).toBeDefined();
        expect(newStoredEvent?.author).toEqual(1);
        expect(newStoredEvent?.biovers).toEqual(1);
        expect(newStoredEvent?.data).toEqual('{Event: "Open Biovers"}');
    }
    else {
        throw new Error('Cannot create the User trace');
    }    
  });

  it('Delete user trace', async () => {
    const res = await server.inject({
      method: 'POST',
      url: '/api/v1/event/delete',
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: 'test',
        },
      },
      payload: event,
    });
    const response = res.result as responseModel;
    if (response && response.data) {
        const deletedEvent= response.data as EventModel;
        expect(deletedEvent).toBeDefined();
        expect(deletedEvent?.author).toEqual(1);
        expect(deletedEvent?.biovers).toEqual(1);
        expect(deletedEvent?.deleted_date).toBeDefined();
    }
    else {
        throw new Error('Cannot delete the User trace');
    }    
  });
});
