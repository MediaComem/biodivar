import { Server } from '@hapi/hapi';

import { init } from '../../src/server';
import { setupConfig } from '../config/config';
import { setupSymbol, dropSymbol, symbol_test } from '../data/model/symbol';
import { SymbolModel } from '../../src/types/symbol-model';
import { responseModel } from '../../src/types/response';

describe('Test Symbol Routes', () => {
  let server: Server;

  beforeAll(async () => {
    setupConfig();
    server = await init();
  });

  afterEach(async () => {
    await dropSymbol(server.app.prisma);
  });

  afterAll(async () => {
    await server.stop();
  });

  it('Get a Symbol', async () => {
    await setupSymbol(server.app.prisma);
    const res = await server.inject({
      method: 'GET',
      url: '/api/v1/symbol/id?id=2',
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: 'test',
        },
      },
      payload: symbol_test,
    });
    const response = res.result as responseModel;
    expect(response).toEqual('this is a test');
  });


  it('Update a Symbol', async () => {
    await setupSymbol(server.app.prisma);
    const getSymbol = JSON.parse(JSON.stringify(symbol_test));
    getSymbol.id = 2;
    if (getSymbol) {
      getSymbol.media_type = 'TEST';
      const res = await server.inject({
        method: 'POST',
        url: `/api/v1/symbol/update`,
        auth: {
          strategy: 'default',
          credentials: {
            id: 1,
            password: 'test',
          },
        },
        payload: getSymbol as SymbolModel,
      });
      const response = res.result as responseModel;
      if (response && response.data) {
        expect(response.statusCode).toEqual(200);
        const symbol = response.data as SymbolModel;
        expect(symbol).toBeDefined();
        expect(symbol.media_type).toEqual('TEST');
        expect(symbol.url).toEqual(`${process.env.SYMBOL_PATH}/default/symbol.txt`);
      } else {
        throw new Error('Cannot update the Symbol');
      }
    } else {
      throw new Error('Cannot update a symbol');
    }
  });

  it('Delete a Symbol', async () => {
    await setupSymbol(server.app.prisma);
    const getSymbol = JSON.parse(JSON.stringify(symbol_test));
    getSymbol.id = 2;
    if (getSymbol) {
      const res = await server.inject({
        method: 'POST',
        url: `/api/v1/symbol/delete`,
        auth: {
          strategy: 'default',
          credentials: {
            id: 1,
            password: 'test',
          },
        },
        payload: getSymbol as SymbolModel,
      });
      const response = res.result as responseModel;
      if (response && response.data) {
        expect(response.statusCode).toEqual(200);
        const symbol = response.data as SymbolModel;
        expect(symbol).toBeDefined();
        expect(symbol.deleted_date).toBeDefined();
      } else {
        throw new Error('Cannot delete the Symbol');
      }
    } else {
      throw new Error('Cannot delete a symbol');
    }
  });

  /*
  it('Create a Symbol', async () => {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(`${process.env.SYMBOL_PATH}/default/symbol.txt`));
    console.log(formData);
    const res = await server.inject({
      method: 'POST',
      url: `/api/v1/symbol/create`,
      auth: {
        strategy: 'default',
        credentials: {
          id: 1,
          password: 'test',
        },
      },
      payload: formData,
    });
    const response = res.result as responseModel;
    console.log(response);
  });*/
});
