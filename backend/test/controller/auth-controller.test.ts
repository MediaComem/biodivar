import { Server, Request, ResponseToolkit } from '@hapi/hapi';

import { init } from '../../src/server';
import { setupConfig } from '../config/config';

import { registerUser } from '../../src/controller/auth-controller';

describe('Test biovers controller', () => {
  let server: Server;
  let request: Request;
  let h: ResponseToolkit;

  beforeAll(async () => {
    setupConfig();
    server = await init();
  });

  afterAll(async () => {
    await server.stop();
  });

  it('Failed user registration', async () => {
    try {
        await registerUser(request, h);
    } catch {
        return 'success';
    }
  });
});
