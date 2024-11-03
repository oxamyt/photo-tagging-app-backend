const { v4: uuidv4 } = require("uuid");
const prismaQueries = require("../prisma/prismaQueries");

async function startTimer(req, res) {
  try {
    const sessionId = req.cookies.sessionId || uuidv4();
    const startTime = Date.now();
    const addUserSession = await prismaQueries.addUserSession(
      sessionId,
      startTime
    );
    res.cookie("sessionId", sessionId);
    res.status(200);
    res.send();
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

  const User = await prismaQueries.fetchUser(sessionId);
  if (!User) {
    return res.status(400).json({ message: "Invalid Session ID" });
  }

  const endTime = Date.now();

  const elapsedTime = Math.floor((endTime - User.startTime) / 1000);

  await prismaQueries.pushElapsedTime(sessionId, elapsedTime);

  res.status(200).json({ elapsedTime });
}

module.exports = {
  startTimer,
  endTimer,
};
