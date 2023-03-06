import { Server } from "@hapi/hapi";

import { init } from "../../src/server";
import { responseModel } from "../../src/types/response";
import { setupConfig } from "../config/config";

describe("Test Biovers Routes", () => {
  let server: Server;

  beforeAll(async () => {
    setupConfig();
    server = await init();
  });

  afterAll(async () => {
    await server.stop();
  });

  it("Test not existing route", async () => {  
    const res = await server.inject({
        method: "GET",
        url: "/api/v1/abcdefghigklmnopqrstuvwxyz",
    });
    const response = res.result as responseModel;
    expect(response.statusCode).toBe(404);
    expect(response.message).toEqual('404 Error! Page Not Found!');
  });

});