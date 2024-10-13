import request from "supertest";

import app from "../../app";

it("returns a 200 status code", async () => {
    const response = await request(app).get("/hello/").send();

    expect(response.status).toBe(200);
});
