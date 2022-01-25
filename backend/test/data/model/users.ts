import { PrismaClient } from "@prisma/client";

export const setupUsers = async (prisma: PrismaClient) => {
    await prisma.user.create({
        data: {
            id: 1,
            username: 'Rich',
            email: 'rich@test.com',
            password: '$2a$10$NEqPoYNnZ4lVXjADNUOhQuqmkXFy9/dn9GUntjhi4JOguNBVvwq1K',
            creation_date: new Date('2021-01-25T03:24:00').toISOString()
        }   
    });
    await prisma.user.create({
        data: {
            id: 2,
            username: 'Rach',
            email: 'rach@test.com',
            password: '$2a$10$NEqPoYNnZ4lVXjADNUOhQuqmkXFy9/dn9GUntjhi4JOguNBVvwq1K', // test
            creation_date: new Date('2021-01-25T03:24:00').toISOString()
        }   
    });
    await prisma.user.create({
        data: {
            id: 3,
            username: 'Roch',
            email: 'roch@test.com',
            password: '$2a$10$NEqPoYNnZ4lVXjADNUOhQuqmkXFy9/dn9GUntjhi4JOguNBVvwq1K', // test
            creation_date: new Date('2021-01-25T03:24:00').toISOString(),
            deleted_date: new Date('2021-01-25T04:24:00').toISOString(),
        }   
    });
};

export const dropUsers = async (prisma: PrismaClient) => {
    await prisma.user.deleteMany({});
};