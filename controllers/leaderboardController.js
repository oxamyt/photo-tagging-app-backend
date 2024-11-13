const prismaQueries = require("../prisma/prismaQueries");

async function fetchLeaderboard(req, res) {
  try {
    const Leaderboard = await prismaQueries.fetchLeaderboard();

    res.status(200).json(Leaderboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function recordTime(req, res) {
  try {
    const { username } = req.body;

    if (!req.session.totalTime) {
      return res.status(400).json({ message: "No total time!" });
    }
    const LeaderBoardUser = await prismaQueries.pushUserToLeaderBoard(
      username,
      req.session.totalTime
    );

    res.status(200).json({
      name: LeaderBoardUser.user,
      totalTime: LeaderBoardUser.time,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { fetchLeaderboard, recordTime };
