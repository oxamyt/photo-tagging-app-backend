const leaderboardRouter = require("../routes/leaderboardRouter");
const request = require("supertest");
const express = require("express");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const timerRouter = require("../routes/timerRouter");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
import { test, expect } from "vitest";
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: false,
    },
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use("/timer", timerRouter);
app.use("/leaderboard", leaderboardRouter);

test("fetch leaderboard", async () => {
  const response = await request(app).get("/leaderboard");
  expect(response.status).toBe(200);
});

test("record user time to leaderBoard", async () => {
  const startResponse = await request(app).post("/timer/start");
  const cookies = startResponse.headers["set-cookie"];

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const endTimerResponse = await request(app)
    .post("/timer/end")
    .set("Cookie", cookies)
    .send({ clientTotalTime: 3000 });

  const pushTimeToLeaderBoard = await request(app)
    .post("/leaderboard")
    .set("Cookie", cookies)
    .send({ username: "Gog", imageId: 1 });
  expect(pushTimeToLeaderBoard.status).toBe(200);
  expect(pushTimeToLeaderBoard.body.totalTime).toBeLessThan(4000);
  expect(pushTimeToLeaderBoard.body.name).toEqual("Gog");
});
