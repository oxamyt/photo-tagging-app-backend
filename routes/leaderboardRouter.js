const { Router } = require("express");
const leaderboardController = require("../controllers/leaderboardController");

const leaderboardRouter = Router();

leaderboardRouter.get("/", leaderboardController.fetchLeaderboard);

leaderboardRouter.post("/", leaderboardController.recordTime);

module.exports = leaderboardRouter;
