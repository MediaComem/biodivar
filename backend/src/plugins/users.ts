import { Server } from "@hapi/hapi";

export const usersPlugin = {
  name: "app/users",
  dependencies: ["prisma"],
  register: async function (server: Server) {
    server.route([]);
  },
};
