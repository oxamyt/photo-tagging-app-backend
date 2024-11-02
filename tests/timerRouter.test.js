const timerRouter = require("../routes/timerRouter");
const request = require("supertest");
const express = require("express");
import { test, expect } from "vitest";
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/", timerRouter);

test("start timer", async () => {
  const response = await request(app).post("/timer/start");
  expect(response.status).toBe(200);
  expect(response.headers["set-cookie"]).toBeDefined();
});

test("end timer", async () => {
  const startResponse = await request(app).post("/timer/start");
  const cookies = startResponse.headers["set-cookie"];

  const response = await request(app).post("/timer/end").set("Cookie", cookies);
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("elapsedTime");
});
