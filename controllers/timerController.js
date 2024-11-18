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

    const { clientTotalTime } = req.body;

    const endTime = Date.now();

    const elapsedServerTime = endTime - req.session.startTime;

    const timeDifference = Math.abs(elapsedServerTime - clientTotalTime);

    let elapsedTime;

    if (timeDifference > 2000) {
      elapsedTime = elapsedServerTime;
      req.session.totalTime = elapsedTime;
    } else {
      elapsedTime = clientTotalTime;
      req.session.totalTime = elapsedTime;
    }

    res.status(200).json({ elapsedTime });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  startTimer,
  endTimer,
};
