import fs from 'fs';
import path from 'path';
import { Server } from '@hapi/hapi';

import { storeSymbol } from '../../src/utils/symbol-storing';

import { init } from '../../src/server';
import { setupConfig } from '../config/config';

const dirPath = process.env.SYMBOL_PATH;

describe('Test symbole storage utils functions', () => {

    let server: Server;

    beforeAll(async () => {
        setupConfig();
        server = await init();
      });
    
      afterAll(async () => {
        await server.stop();
      });

    it('store when the symbol does not exist', async () => {
        const fileBuffer = fs.readFileSync(`${dirPath}/default/symbol.txt`);
        const storedPath = await storeSymbol(4, 'test.txt', fileBuffer, server.app.logger);
        expect(fs.existsSync(storedPath)).toBe(true);
        const name = path.parse(storedPath).name;
        expect(name).toEqual('test')
        fs.unlinkSync(storedPath);
        expect(fs.existsSync(storedPath)).toBe(false);
    });

    it('store when the symbol exists', async () => {
        const fileBuffer = fs.readFileSync(`${dirPath}/default/symbol.txt`);
        const storedPath = await storeSymbol(4, 'test.txt', fileBuffer, server.app.logger);
        expect(fs.existsSync(storedPath)).toBe(true);
        const name = path.parse(storedPath).name;
        expect(name).toEqual('test')
        const storedPathSecond = await storeSymbol(4, 'test.txt', fileBuffer, server.app.logger);
        expect(fs.existsSync(storedPathSecond)).toBe(true);
        const nameSecond = path.parse(storedPathSecond).name;
        expect(nameSecond).toEqual('test_1')
        fs.unlinkSync(storedPath);
        expect(fs.existsSync(storedPath)).toBe(false);
        fs.unlinkSync(storedPathSecond);
        expect(fs.existsSync(storedPathSecond)).toBe(false);
    });
});