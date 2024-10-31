const timerRouter = require("../routes/timerRouter");
const request = require("supertest");
const express = require("express");
import { test, expect } from "vitest";

const app = express();
app.use(express.json());
app.use("/", timerRouter);

test("start timer", async () => {
  const response = await request(app).post("/timer/start");
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("startTime");
});

test("end timer", async () => {
  const startResponse = await request(app).post("/timer/start");
  const startTime = startResponse.body.startTime;

  const response = await request(app).post("/timer/end").send({ startTime });
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("elapsedTime");
});
