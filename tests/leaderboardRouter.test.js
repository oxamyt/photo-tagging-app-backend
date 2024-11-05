const leaderboardRouter = require("../routes/leaderboardRouter");
const request = require("supertest");
const express = require("express");
import { test, expect } from "vitest";

const app = express();

app.use(express.json());
app.use("/", leaderboardRouter);

test("fetch leaderboard", async () => {
  const response = await request(app).get("/leaderboard");
  expect(response.status).toBe(200);
});
