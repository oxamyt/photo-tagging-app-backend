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

  const response = await request(app).post("/end").set("Cookie", cookies);
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("elapsedTime");
});

test("record user time to leaderBoard", async () => {
  const startResponse = await request(app).post("/start");
  const cookies = startResponse.headers["set-cookie"];

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const endTimerResponse = await request(app)
    .post("/end")
    .set("Cookie", cookies);

  const pushTimeToLeaderBoard = await request(app)
    .post("/record")
    .set("Cookie", cookies)
    .send({ name: "Gog" });
  expect(pushTimeToLeaderBoard.status).toBe(200);
  expect(pushTimeToLeaderBoard.body.totalTime).toEqual(3);
  expect(pushTimeToLeaderBoard.body.name).toEqual("Gog");
});
