const gameRouter = require("../routes/gameRouter");
const request = require("supertest");
const express = require("express");
import { test, expect } from "vitest";

const app = express();

app.use(express.json());
app.use("/", gameRouter);

const exactTestCases = [
  { character: "PATRICK", x: 1315, y: 1837 },
  { character: "TOM", x: 1708, y: 3293 },
  { character: "TOMMY VERCETTI", x: 606, y: 3511 },
];

const approximateTestCases = [
  { character: "PATRICK", x: 1295, y: 1857 },
  { character: "TOM", x: 1691, y: 3264 },
  { character: "TOMMY VERCETTI", x: 604, y: 3500 },
];

exactTestCases.forEach(({ character, x, y }) => {
  test(`verifying exact coordinates works with ${character}`, async () => {
    const response = await request(app).post("/game").send({ character, x, y });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ success: true });
  });
});

approximateTestCases.forEach(({ character, x, y }) => {
  test(`verifying approximate coordinates works with ${character}`, async () => {
    const response = await request(app).post("/game").send({ character, x, y });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ success: true });
  });
});
