const timerRouter = require("../routes/timerRouter");
const request = require("supertest");
const express = require("express");
const expressSession = require("express-session");
import { test, expect } from "vitest";
const cookieParser = require("cookie-parser");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
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
