import { PrismaClient } from "@prisma/client";

import { setupMediaType, dropMediaType  } from "../model/media-type";
import { setupMedia, dropMedia } from "../model/media";
import { setupSymbol, dropSymbol } from "../model/symbol";
import { setupCoordinate, dropCoordinate } from "../model/coordinate";
import { setupUsers, dropUsers } from "../model/users";
import { setupStyle, dropStyle } from "../model/style";
import { setupAction, dropAction } from "../model/action";
import { setupBiovers, dropBiovers } from "../model/biovers";
import { setupTrace, dropTrace } from "../model/trace";
import { setupSettings, dropSettings } from "../model/settings";
import { setupPath, dropPath } from "../model/path";
import { setupPoi, dropPoi } from "../model/poi";

export const generateData = async (prisma: PrismaClient) => {
    await setupUsers(prisma);
    await setupCoordinate(prisma);
    await setupAction(prisma);
    await setupBiovers(prisma);
    await setupPath(prisma);
    await setupPoi(prisma);
    await setupMediaType(prisma);
    await setupMedia(prisma)
    await setupSymbol(prisma);
    await setupStyle(prisma);
    await setupSettings(prisma);
    await setupTrace(prisma);
}

export const dropData = async (prisma: PrismaClient) => {
    await dropSymbol(prisma);
    await dropMedia(prisma);
    await dropMediaType(prisma);
    await dropPath(prisma);
    await dropPoi(prisma);
    await dropStyle(prisma);
    await dropTrace(prisma);
    await dropSettings(prisma);
    await dropBiovers(prisma);
    await dropAction(prisma);
    await dropCoordinate(prisma);
    await dropUsers(prisma);
}