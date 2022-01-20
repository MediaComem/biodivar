import { Server, ServerRoute } from "@hapi/hapi";

const usersPlugin = {
  name: "app/users",
  dependencies: ["prisma"],
  register: async function (server: Server) {
    server.route([]);
  },
};

export default usersPlugin;
