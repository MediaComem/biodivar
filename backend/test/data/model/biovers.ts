import { PrismaClient } from "@prisma/client";

export const setupBiovers = async (prisma: PrismaClient) => {
    await prisma.biovers.create({
        data: {
            id: 1,
            name: "Biovers 1",
            owner: 1,
            
        }   
    });
    await prisma.biovers.create({
        data: {
            id: 2,
            name: "Biovers 2",
            owner: 2,
            
        }   
    });
}

export const dropBiovers = async (prisma: PrismaClient) => {
    await prisma.biovers.deleteMany({});
};