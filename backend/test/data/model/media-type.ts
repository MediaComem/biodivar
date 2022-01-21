import { PrismaClient } from "@prisma/client";

export const setupMediaType = async (prisma: PrismaClient) => {
    await prisma.mediaType.create({
        data: {
            id: 1,
            type: "Video"
        }   
    });
    await prisma.mediaType.create({
        data: {
            id: 2,
            type: "Image"
        }   
    });
}

export const dropMediaType = async (prisma: PrismaClient) => {
    await prisma.mediaType.deleteMany({});
};