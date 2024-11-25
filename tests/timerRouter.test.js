const timerRouter = require("../routes/timerRouter");
const request = require("supertest");
const express = require("express");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
import { test, expect } from "vitest";
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
const isProduction = process.env.NODE_ENV === "production";
app.use(
  session({
    cookie: {
      maxAge: 86400000, // 24 hours
      secure: isProduction, // Secure cookies in production only
      sameSite: isProduction ? "None" : "Lax", // SameSite=None for cross-site cookies, Lax for local dev
    },
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    resave: false,
    secret: process.env.SECRET,
  })
);
app.use("/", timerRouter);

test("start timer", async () => {
  const response = await request(app).post("/start");
  expect(response.status).toBe(200);
  expect(response.headers["set-cookie"]).toBeDefined();
});

test("end timer", async () => {
  const startResponse = await request(app).post("/start");
  const cookies = startResponse.headers["set-cookie"];

  const clientTotalTime = 5000;
  const response = await request(app)
    .post("/end")
    .set("Cookie", cookies)
    .send({ clientTotalTime });
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("elapsedTime");
});
