import fs from 'fs';
import winston from 'winston';

export const storeSymbol = async (userId: number, symbolName: String , symbol: Buffer, logger: winston.Logger) => {
    const symbolPath = `${process.env.SYMBOL_PATH}/${userId}`;
    try {
        fs.mkdirSync(symbolPath, {recursive: true});
        fs.writeFileSync(`${symbolPath}/${symbolName}`, symbol);
        return `${symbolPath}/${symbolName}`;
    }
    catch (error) {
        logger.error(error);
        throw new Error('Cannot store the image');
    }
}