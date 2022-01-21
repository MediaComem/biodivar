import { PrismaClient } from "@prisma/client";

export const setupSettings = async (prisma: PrismaClient) => {
    await prisma.settings.create({
        data: {
            id: 1,
            biovers: 1,
            
        }   
    });
    await prisma.settings.create({
        data: {
            id: 2,
            biovers: 2,
            
        }   
    });
}

export const dropSettings = async (prisma: PrismaClient) => {
    await prisma.settings.deleteMany({});
};