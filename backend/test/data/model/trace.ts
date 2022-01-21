import { PrismaClient } from "@prisma/client";

export const setupTrace = async (prisma: PrismaClient) => {
    await prisma.trace.create({
        data: {
            id: 1,
            creation_date: new Date().toISOString(),
            autor: 1,
            is_public: true,
            coordinate_id: 1,
            biovers: 1,
            action_id: 1
        }   
    });
    await prisma.trace.create({
        data: {
            id: 2,
            creation_date: new Date().toISOString(),
            autor: 2,
            is_public: false,
            coordinate_id: 2,
            biovers: 2,
            action_id: 2
        }   
    });
}

export const dropTrace = async (prisma: PrismaClient) => {
    await prisma.trace.deleteMany({});
};