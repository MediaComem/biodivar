import { Server } from "@hapi/hapi";

import { init } from "../src/server";

describe("Test server initialialization", () => {
    let server: Server;

	beforeEach(async () => {
		server = await init();
	})
	afterEach( async() => {
		await server.stop();
	});

    it("Redirect to login page when not authenticate", async () => {
		const res = await server.inject({
			method: "GET",
			url: "/"
		});
		expect(res.statusCode).toEqual(302);
		expect(res.headers.location).toEqual("/login");
	});
  });