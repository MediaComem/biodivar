import { PrismaClient } from "@prisma/client";

export const setupCoordinate = async (prisma: PrismaClient) => {
    await prisma.coordinate.create({
        data: {
            id: 1,
            long: 32.5,
            lat: 44.5,
            alt: 100.44,  
        }   
    });
    await prisma.coordinate.create({
        data: {
            id: 2,
            long: 33.5,
            lat: 44.5,
            alt: 98.44,
        }   
    });
}

export const dropCoordinate = async (prisma: PrismaClient) => {
    await prisma.coordinate.deleteMany({});
};