import { PrismaClient } from "@prisma/client";

export const setupMedia = async (prisma: PrismaClient) => {
    await prisma.media.create({
        data: {
            id: 1,
            url: "http://test.com",
            media_type_id: 1,
            elevation_ground:   115.55,
            is_facing_user: false,
            is_visible: false,
            caption: "This is a caption",
            caption_visible: true,
            poi: 1
        }   
    });
    await prisma.media.create({
        data: {
            id: 2,
            media_type_id: 2,
            url: "http://test3.com",
            elevation_ground:   155.55,
            is_facing_user: false,
            is_visible: true,
            caption: "This is a caption",
            caption_visible: true,
            poi: 2
        }   
    });
}

export const dropMedia = async (prisma: PrismaClient) => {
    await prisma.media.deleteMany({});
};