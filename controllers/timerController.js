const prismaQueries = require("../prisma/prismaQueries");

async function startTimer(req, res) {
  try {
    const startTime = Date.now();
    req.session.startTime = startTime;
    res.status(200).send({ status: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function endTimer(req, res) {
  try {
    if (!req.session.startTime) {
      return res.status(400).json({ message: "Timer has not been started" });
    }

    const endTime = Date.now();

    const elapsedTime = Math.floor((endTime - req.session.startTime) / 1000);

    req.session.totalTime = elapsedTime;

    res.status(200).json({ elapsedTime });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function recordTime(req, res) {
  try {
    const { name } = req.body;

    if (!req.session.totalTime) {
      return res.status(400).json({ message: "No total time!" });
    }

    const LeaderBoardUser = await prismaQueries.pushUserToLeaderBoard(
      name,
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

module.exports = {
  startTimer,
  endTimer,
  recordTime,
};
