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
  { character: "PATRICK", x: 1215, y: 1937 },
  { character: "TOM", x: 1631, y: 3120 },
  { character: "TOMMY VERCETTI", x: 702, y: 3416 },
];

exactTestCases.forEach(({ character, x, y }) => {
  test(`verifying exact coordinates works with ${character}`, async () => {
    const response = await request(app).post("/game").send({ character, x, y });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Correct!", success: true });
  });
});

approximateTestCases.forEach(({ character, x, y }) => {
  test(`verifying approximate coordinates works with ${character}`, async () => {
    const response = await request(app).post("/game").send({ character, x, y });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Correct!", success: true });
  });
});
