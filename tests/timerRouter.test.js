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
  expect(response.body).toHaveProperty("sessionId");
});

test("end timer", async () => {
  const startResponse = await request(app).post("/timer/start");
  const sessionId = startResponse.body.sessionId;

  const response = await request(app).post("/timer/end").send({ sessionId });
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("elapsedTime");
});
