import { PrismaClient } from "@prisma/client";

export const setupPoi = async (prisma: PrismaClient) => {
    await prisma.poi.create({
        data: {
            id: 1,
            title: "POI 1",
            subtitle: "Sub POI 1",
            creation_date: new Date().toISOString(),
            update_data: new Date().toISOString(),
            autor: 1,
            last_contributor: 2,
            is_public: true,
            coordinate_id: 1,
            biovers: 1,
            radius: 33.3,
            visible_from: 33.33,
            trigger_mode: "A",
            metadata: ""
        }   
    });
    await prisma.poi.create({
        data: {
            id: 2,
            title: "POI 2",
            subtitle: "Sub POI 2",
            creation_date: new Date().toISOString(),
            update_data: new Date().toISOString(),
            autor: 2,
            last_contributor: 2,
            is_public: true,
            coordinate_id: 2,
            biovers: 1,
            radius: 33.3,
            visible_from: 33.33,
            trigger_mode: "B",
            metadata: ""
        }   
    });
}

export const dropPoi = async (prisma: PrismaClient) => {
    await prisma.poi.deleteMany({});
};