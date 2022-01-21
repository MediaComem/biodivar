import { Request, ResponseToolkit } from "@hapi/hapi";

export const getBiovers = async (request: Request, h: ResponseToolkit) => {
    const prisma = request.server.app.prisma;
    const biovers = await prisma.biovers.findMany({
        include: {
            setting: true,
            Poi: {
                include: {
                    User: true,
                    last_contributor_fk: true,
                    coordinate: true,
                    style: true,
                    symbol: {
                        include: {
                            media_type: true
                        }
                    },
                    media: {
                        include: {
                            media_type: true
                        }
                    }
                }
            },
            Path: {
                include: {
                    User: true,
                    last_contributor_fk: true,
                    coordinate: true,
                    style: true,
                }
            },
            trace: {
                include: {
                    coordinate: true,
                    action: true,
                    User: true
                }
            },
        }
    })
    return biovers;
}