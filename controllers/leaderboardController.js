const prismaQueries = require("../prisma/prismaQueries");

async function fetchLeaderboard(req, res) {
  try {
    const { imageId } = req.body;

    const Leaderboard = await prismaQueries.fetchLeaderboard(imageId);

    res.status(200).json(Leaderboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function recordTime(req, res) {
  try {
    const { username, imageId } = req.body;

    if (!req.session.totalTime) {
      return res.status(400).json({ message: "No total time!" });
    }
    const LeaderBoardUser = await prismaQueries.pushUserToLeaderBoard(
      username,
      req.session.totalTime,
      imageId
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

async function fetchImagesData(req, res) {
  try {
    const Images = await prismaQueries.fetchImages();

    res.status(200).json({
      Images,
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = { fetchLeaderboard, recordTime, fetchImagesData };
