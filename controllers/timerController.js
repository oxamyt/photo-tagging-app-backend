const { v4: uuidv4 } = require("uuid");

const timers = {};

async function startTimer(req, res) {
  try {
    const sessionId = req.body.sessionId || uuidv4();
    timers[sessionId] = Date.now();
    res.status(200).json({ startTime: timers[sessionId], sessionId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function endTimer(req, res) {
  const { sessionId, startTime } = req.body;

  if (!sessionId || !startTime) {
    return res
      .status(400)
      .json({ message: "Session ID and start time are required" });
  }

  if (!timers[sessionId]) {
    return res.status(400).json({ message: "Invalid Session ID" });
  }

  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  res.status(200).json({ elapsedTime });
  delete timers[sessionId];
}

module.exports = {
  startTimer,
  endTimer,
};
