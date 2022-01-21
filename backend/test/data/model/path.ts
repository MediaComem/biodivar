import { PrismaClient } from "@prisma/client";

export const setupPath = async (prisma: PrismaClient) => {
    await prisma.path.create({
        data: {
            id: 1,
            creation_date: new Date().toISOString(),
            update_data: new Date().toISOString(),
            autor: 1,
            last_contributor: 2,
            is_public: true,
            is_editable: true,
            coordinate_id: 1,
            biovers: 1,
            visible_from: 33.33,
            metadata: ""
        }   
    });
    await prisma.path.create({
        data: {
            id: 2,
            creation_date: new Date().toISOString(),
            update_data: new Date().toISOString(),
            autor: 1,
            last_contributor: 1,
            is_public: true,
            is_editable: true,
            coordinate_id: 2,
            biovers: 1,
            visible_from: 33.34,
            metadata: ""
        }   
    });
}

export const dropPath = async (prisma: PrismaClient) => {
    await prisma.path.deleteMany({});
};