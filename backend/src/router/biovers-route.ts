import { ServerRoute } from "@hapi/hapi";

import { getBiovers } from "../controller/biovers-controller";

export const bioversRoutes: ServerRoute[] = [];

bioversRoutes.push({
  method: "GET",
  path: "/biovers",
  handler: getBiovers,
});
