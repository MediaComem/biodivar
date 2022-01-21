import { PrismaClient } from "@prisma/client";

export const setupUsers = async (prisma: PrismaClient) => {
    await prisma.user.create({
        data: {
            id: 1,
            username: 'Rich',
            email: 'rich@test.com',
            password: '$2a$10$NEqPoYNnZ4lVXjADNUOhQuqmkXFy9/dn9GUntjhi4JOguNBVvwq1K' // test
        }   
    });
    await prisma.user.create({
        data: {
            id: 2,
            username: 'Rach',
            email: 'rach@test.com',
            password: '$2a$10$NEqPoYNnZ4lVXjADNUOhQuqmkXFy9/dn9GUntjhi4JOguNBVvwq1K' // test
        }   
    });
};

export const dropUsers = async (prisma: PrismaClient) => {
    await prisma.user.deleteMany({});
};