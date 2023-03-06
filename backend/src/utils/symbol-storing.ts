import fs from 'fs';
import path from 'path';
import winston from 'winston';

const fileExist = (origin: string, fullPath: string, next: number): string => {
    if (fs.existsSync(fullPath)) {
        const directories = path.dirname(fullPath);
        const name = path.parse(origin).name;
        const ext = path.parse(origin).ext;
        return fileExist(origin, `${directories}/${name}_${next}${ext}`, next + 1);
    }
    return fullPath;
}


export const storeSymbol = async (userId: number, symbolName: string , symbol: Buffer, logger: winston.Logger) => {
    const symbolPath = `${process.env.SYMBOL_PATH}/${userId}`;
    try {
        fs.mkdirSync(symbolPath, {recursive: true});
        let fullPath = `${symbolPath}/${symbolName}`;
        const finalPath = fileExist(symbolName, fullPath, 1);
        fs.writeFileSync(finalPath, symbol);
        return finalPath;
    }
    catch (error) {
        logger.error(error);
        throw new Error('Cannot store the image');
    }
}