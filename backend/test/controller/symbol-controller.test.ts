import { Server } from '@hapi/hapi';

import { init } from '../../src/server';
import { setupConfig } from '../config/config';
import { symbol_test, setupSymbol, dropSymbol } from '../data/model/symbol';

import {
  getSymbolById,
  createSymbol,
  updateSymbol,
  deleteSymbol
} from '../../src/controller/symbol-controller';
import { SymbolModel } from '../../src/types/symbol-model';

describe('Test Symbol Controller', () => {
  let server: Server;

  beforeAll(async () => {
    setupConfig();
    server = await init();
  });

  afterEach(async () => {
    await dropSymbol(server.app.prisma);
  });

  it('Get Symbol', async () => {
    await setupSymbol(server.app.prisma);
    const symbol = await getSymbolById(server.app.prisma, 2);
    expect(symbol).toBeDefined();
    expect(symbol?.media_type).toEqual('Video');
    expect(symbol?.url).toEqual('/specific/path');
  });

  it('Create Symbol', async () => {
    const symbol = await createSymbol(
      server.app.prisma,
      symbol_test,
      server.app.logger
    );
    expect(symbol).toBeDefined();
    expect(symbol.media_type).toEqual('Video');
    expect(symbol.url).toEqual('/specific/path');
  });

  it('Update Symbol', async () => {
    await setupSymbol(server.app.prisma);
    const getSymbol = await getSymbolById(server.app.prisma, 2);
    if (getSymbol) {
      getSymbol.media_type = 'TEST';
      const symbol = await updateSymbol(
        server.app.prisma,
        getSymbol as SymbolModel,
        server.app.logger
      );
      expect(symbol).toBeDefined();
      expect(symbol.media_type).toEqual('TEST');
      expect(symbol.url).toEqual('/specific/path');
    }
  });

  it('Delete Symbol', async () => {
    await setupSymbol(server.app.prisma);
    const getSymbol = await getSymbolById(server.app.prisma, 2);
    if (getSymbol) {
      const symbol = await deleteSymbol(
        server.app.prisma,
        getSymbol as SymbolModel,
        server.app.logger
      );
      expect(symbol).toBeDefined();
      expect(symbol?.deleted_date).toBeDefined();
    }
  });
});
