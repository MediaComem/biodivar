import { Request } from "@hapi/hapi";

export const getUserById = async (
  request: Request,
  id: number
) => {
  const { prisma } = request.server.app;
  const user = await prisma.user.findFirst({
    where: {
      id: id
    }
  });
  return user;
};

export const getUserByName = async (
  request: Request,
  username: string
) => {
  const { prisma } = request.server.app;
  const user = await prisma.user.findFirst({
    where: {
      username: username
    }
  });
  return user;
};
