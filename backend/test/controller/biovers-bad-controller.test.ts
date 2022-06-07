import { Server } from '@hapi/hapi';

import { init } from '../../src/server';
import { badConfig } from '../config/config';

import {
  createBiovers,
  deleteBiovers,
  getPublicBiovers,
  getBioversById,
  updateBiovers,
} from '../../src/controller/biovers-controller';
import { BioversModel } from '../../src/types/biovers-model';
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

  it('Error with getBioversById', async () => {
    try {
        await getBioversById(server.app.prisma, 1, 1, server.app.logger);
        fail();
    } catch(error) {
        return;
    }
  })

  it('Error with getPubliBiovers', async () => {
    try {
        await getPublicBiovers(server.app.prisma, server.app.logger);
        fail();
    } catch(error) {
        return;
    }
  })

  it('Error with create', async () => {
    const biovers: BioversModel = {
        name: 'New Biovers',
        owner: 2,
        creation_date: new Date(),
      };
    try {
        await createBiovers(server.app.prisma, biovers,server.app.logger);
        fail();
    } catch(error) {
        return;
    }
  })

  it('Error with update without id', async () => {
    const biovers: BioversModel = {
        name: 'New Biovers',
        owner: 2,
        creation_date: new Date(),
      };
    try {
        await updateBiovers(server.app.prisma, biovers,server.app.logger);
        fail();
    } catch(error) {
        return;
    }
  })

  it('Error with update with id', async () => {
    const biovers: BioversModel = {
        id: 1,
        name: 'New Biovers',
        owner: 2,
        creation_date: new Date(),
      };
    try {
        await updateBiovers(server.app.prisma, biovers,server.app.logger);
        fail();
    } catch(error) {
        return;
    }
  })

  it('Error with delete without id', async () => {
    const biovers: BioversModel = {
        name: 'New Biovers',
        owner: 2,
        creation_date: new Date(),
      };
    try {
        await deleteBiovers(server.app.prisma, biovers,server.app.logger);
        fail();
    } catch(error) {
        return;
    }
  })

  it('Error with delete with id', async () => {
    const biovers: BioversModel = {
        id: 1,
        name: 'New Biovers',
        owner: 2,
        creation_date: new Date(),
      };
    try {
        await deleteBiovers(server.app.prisma, biovers,server.app.logger);
        fail();
    } catch(error) {
        return;
    }
  })
});
