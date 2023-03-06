import { PrismaClient } from '@prisma/client';
 
export const getSymbolById = async (prisma: PrismaClient, id: number) => {
  const symbol = await prisma.poi.findFirst({
    where: {
      id: id,
      deleted_date: null,
    },
  });
  if (symbol && symbol.map_url) {
    return symbol.map_url;
  }
  return null;
}
