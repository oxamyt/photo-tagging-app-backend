const prismaQueries = require("../prisma/prismaQueries");

async function fetchLeaderboard(req, res) {
  try {
    const Leaderboard = await prismaQueries.fetchLeaderboard();

    res.status(200).json(Leaderboard);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { fetchLeaderboard };
