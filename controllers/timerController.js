const { v4: uuidv4 } = require("uuid");

const sessions = {};

async function startTimer(req, res) {
  try {
    const sessionId = req.cookies.sessionId || uuidv4();
    const startTime = Date.now();
    sessions[sessionId] = { startTime, endTime: 0, totalTime: 0 };
    res.cookie("sessionId", sessionId);
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function endTimer(req, res) {
  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    return res.status(400).json({ message: "Session ID are required" });
  }

  if (!sessions[sessionId]) {
    return res.status(400).json({ message: "Invalid Session ID" });
  }

  const endTime = Date.now();

  sessions[sessionId].endTime = endTime;

  const elapsedTime = Math.floor(
    (sessions[sessionId].endTime - sessions[sessionId].startTime) / 1000
  );

  sessions[sessionId].totalTime = elapsedTime;

  res.status(200).json({ elapsedTime });
  delete sessions[sessionId];
}

module.exports = {
  startTimer,
  endTimer,
};
