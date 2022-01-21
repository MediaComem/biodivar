import { PrismaClient } from "@prisma/client";

export const setupSymbol = async (prisma: PrismaClient) => {
    await prisma.symbol.create({
        data: {
            id: 1,
            url: "http://test.com",
            media_type_id: 1,
            elevation_ground:   115,
            is_facing_user: false,
            is_visible: false,
            poi: 1
        }   
    });
    await prisma.symbol.create({
        data: {
            id: 2,
            media_type_id: 2,
            url: "http://test2.com",
            elevation_ground:   155,
            is_facing_user: false,
            is_visible: true,
            poi: 2
        }   
    });
}

export const dropSymbol = async (prisma: PrismaClient) => {
    await prisma.symbol.deleteMany({});
};