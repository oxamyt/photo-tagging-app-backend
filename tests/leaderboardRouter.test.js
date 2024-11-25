const leaderboardRouter = require("../routes/leaderboardRouter");
const request = require("supertest");
const express = require("express");
const cookieParser = require("cookie-parser");
const timerRouter = require("../routes/timerRouter");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
import { test, expect } from "vitest";
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
