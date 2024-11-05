const { Router } = require("express");
const leaderboardController = require("../controllers/leaderboardController");

const leaderboardRouter = Router();

leaderboardRouter.get("/", leaderboardController.fetchLeaderboard);

module.exports = leaderboardRouter;
