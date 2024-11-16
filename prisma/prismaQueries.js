const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function fetchCharacter(characterName) {
  try {
    const Character = await prisma.character.findUnique({
      where: { name: characterName },
    });
    return Character;
  } catch (err) {
    console.error("Error fetching character:", err);
  }
}

async function addUserSession(sessionId, startTime) {
  try {
    const User = await prisma.user.create({
      data: {
        sessionId: sessionId,
        startTime: startTime,
      },
    });
  } catch (err) {
    console.error(err);
  }
}

async function fetchUser(sessionId) {
  try {
    const User = await prisma.user.findFirst({
      where: {
        sessionId: sessionId,
      },
    });
    return User;
  } catch (err) {
    console.error(err);
  }
}

async function pushElapsedTime(sessionId, elapsedTime) {
  try {
    const User = await prisma.user.update({
      where: {
        sessionId: sessionId,
      },
      data: {
        totalTime: elapsedTime,
      },
    });
  } catch (err) {
    console.error(err);
  }
}

async function pushUserToLeaderBoard(name, totalTime) {
  try {
    const User = await prisma.leaderboard.create({
      data: {
        user: name,
        time: totalTime,
      },
    });

    return User;
  } catch (err) {
    console.error(err);
  }
}

async function fetchLeaderboard() {
  try {
    const Leaderboard = await prisma.leaderboard.findMany({
      orderBy: {
        time: "asc",
      },
    });
    return Leaderboard;
  } catch (err) {
    console.error(err);
  }
}

async function fetchImage() {
  try {
    const image = await prisma.image.findFirst();
    return image;
  } catch (err) {
    console.error(err);
  }
}

async function fetchCharacters(params) {
  try {
    const characters = await prisma.character.findMany({
      select: {
        name: true,
        characterImageUrl: true,
        id: true,
      },
    });
    return characters;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  fetchCharacter,
  addUserSession,
  fetchUser,
  pushElapsedTime,
  pushUserToLeaderBoard,
  fetchLeaderboard,
  fetchImage,
  fetchCharacters,
};
