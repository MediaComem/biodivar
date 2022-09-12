import { Server } from '@hapi/hapi';

import { init } from '../../src/server';
import { setupConfig } from '../config/config';
import { setupUsers, dropUsers } from '../data/model/users';
import { setupBiovers, dropBiovers } from '../data/model/biovers';
import { setupEvent, dropEvent, event } from '../data/model/event';
import { EventModel } from '../../src/types/event-model';

import { createEvent, deleteEvent } from '../../src/controller/event-controller';
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
    const newStoredEvent = await createEvent(
      server.app.prisma,
      newEvent,
      server.app.logger
    );
    expect(newStoredEvent).toBeDefined();
    expect(newStoredEvent?.author).toEqual(1);
    expect(newStoredEvent?.biovers).toEqual(1);
    expect(newStoredEvent?.data).toEqual('{Event: "Open Biovers"}');
  });

  it('Delete user trace', async () => {
    const deletedEvent = await deleteEvent(
      server.app.prisma,
      event,
      server.app.logger
    ) as EventModel;
    if (deletedEvent) {
      expect(deletedEvent.author).toEqual(1);
      expect(deletedEvent.biovers).toEqual(1);
      expect(deletedEvent.deleted_date).toBeDefined();
    }
    else {
      throw new Error("Cannot delete user trace");
    }
  });
});
