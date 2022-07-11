import { Server } from '@hapi/hapi';

import { init } from '../../src/server';
import { setupConfig } from '../config/config';
import { setupUsers, dropUsers } from '../data/model/users';
import { setupUserTrace, dropUsersTrace, userTrace } from '../data/model/user_trace';
import { setupBiovers, dropBiovers } from '../data/model/biovers';
import { createUserTrace, deleteUserTrace } from '../../src/controller/user_trace-controller';
import { CoordinateModel } from '../../src/types/coordinate-model';
import { UserTraceModel } from '../../src/types/user_trace-model';

describe('Test User Trace Controller', () => {
  let server: Server;

  beforeAll(async () => {
    setupConfig();
    server = await init();
  });

  beforeEach(async () => {
    await dropUsersTrace(server.app.prisma);
    await dropBiovers(server.app.prisma);
    await dropUsers(server.app.prisma);
    await setupUsers(server.app.prisma);
    await setupBiovers(server.app.prisma);
    await setupUserTrace(server.app.prisma);
  });

  afterAll(async () => {
    await dropUsersTrace(server.app.prisma);
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
    const userTrace: UserTraceModel = {
      author: 1,
      is_public: true,
      biovers: 1,
      gps_accuracy: 2.3,
      coordinate: coordinate,
    };
    const newUserTrace = await createUserTrace(
      server.app.prisma,
      userTrace,
      server.app.logger
    );
    expect(newUserTrace).toBeDefined();
    expect(newUserTrace?.author).toEqual(1);
    expect(newUserTrace?.biovers).toEqual(1);
  });

  it('Delete user trace', async () => {
    const newUserTrace = await deleteUserTrace(
      server.app.prisma,
      userTrace,
      server.app.logger
    ) as UserTraceModel;
    if (newUserTrace) {
      expect(newUserTrace.author).toEqual(1);
      expect(newUserTrace.biovers).toEqual(1);
      expect(newUserTrace.deleted_date).toBeDefined();
    }
    else {
      throw new Error("Cannot delete user trace");
    }
  });
});
