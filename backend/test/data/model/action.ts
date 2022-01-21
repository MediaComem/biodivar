import { PrismaClient } from "@prisma/client";

export const setupAction = async (prisma: PrismaClient) => {
    await prisma.action.create({
        data: {
            id: 1,
            poi: 0,
            path: 2,
            start_date: new Date().toISOString(),
            end_date: new Date().toISOString(),
            is_facing_user: true,
            is_visible: false,
            caption: 'This is a caption',
            caption_visible: false
        }   
    });
    await prisma.action.create({
        data: {
            id: 2,
            poi: 1,
            path: 0,
            start_date: new Date().toISOString(),
            end_date: new Date().toISOString(),
            is_facing_user: true,
            is_visible: true,
            caption: 'This is a caption',
            caption_visible: true
        }   
    });
}

export const dropAction = async (prisma: PrismaClient) => {
    await prisma.action.deleteMany({});
};