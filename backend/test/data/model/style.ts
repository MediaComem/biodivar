import { PrismaClient } from "@prisma/client";

export const setupStyle = async (prisma: PrismaClient) => {
    await prisma.style.create({
        data: {
            id: 1,
            type: "circle",
            stroke: true,
            stroke_width: 11.2,
            fill: true,
            elevation: 55.5,
            height: 45.2,
            noise: 0.2,
            is_public: false,
            path: 1,  
        }   
    });
    await prisma.style.create({
        data: {
            id: 2,
            type: "sphere",
            stroke: false,
            stroke_width: 0.0,
            fill: false,
            elevation: 55.6,
            height: 45.2,
            noise: 0.2,
            is_public: true,
            path: 2,  
        }   
    });
    await prisma.style.create({
        data: {
            id: 3,
            type: "circle",
            stroke: true,
            stroke_width: 11.2,
            fill: true,
            elevation: 55.5,
            height: 45.2,
            noise: 0.2,
            is_public: false,
            poi: 1,  
        }   
    });
    await prisma.style.create({
        data: {
            id: 4,
            type: "sphere",
            stroke: false,
            stroke_width: 0.0,
            fill: false,
            elevation: 55.6,
            height: 45.2,
            noise: 0.2,
            is_public: true,
            poi: 2,  
        }   
    });
}

export const dropStyle = async (prisma: PrismaClient) => {
    await prisma.style.deleteMany({});
};