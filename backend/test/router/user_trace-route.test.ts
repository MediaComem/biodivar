import { Server } from '@hapi/hapi';

import { init } from '../../src/server';
import { setupConfig } from '../config/config';
import { setupUsers, dropUsers } from '../data/model/users';
import { setupUserTrace, dropUsersTrace, userTrace } from '../data/model/user_trace';
import { setupBiovers, dropBiovers } from '../data/model/biovers';
import { CoordinateModel } from '../../src/types/coordinate-model';
import { UserTraceModel } from '../../src/types/user_trace-model';
import { responseModel } from '../../src/types/response';

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
      coordinate: coordinate,
      gps_accuracy: 2.3,
    };
    const res = await server.inject({
      method: 'POST',
      url: '/api/v1/user_trace/create',
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: 'test',
        },
      },
      payload: userTrace,
    });
    const response = res.result as responseModel;
    if (response && response.data) {
        const newUserTrace = response.data as UserTraceModel;
        expect(newUserTrace).toBeDefined();
        expect(newUserTrace?.author).toEqual(1);
        expect(newUserTrace?.biovers).toEqual(1);
    }
    else {
        throw new Error('Cannot create the User trace');
    }    
  });

  it('Delete user trace', async () => {
    const res = await server.inject({
      method: 'POST',
      url: '/api/v1/user_trace/delete',
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: 'test',
        },
      },
      payload: userTrace,
    });
    const response = res.result as responseModel;
    if (response && response.data) {
        const newUserTrace = response.data as UserTraceModel;
        expect(newUserTrace).toBeDefined();
        expect(newUserTrace?.author).toEqual(1);
        expect(newUserTrace?.biovers).toEqual(1);
        expect(newUserTrace?.deleted_date).toBeDefined();
    }
    else {
        throw new Error('Cannot delete the User trace');
    }    
  });
});
