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

async function pushUserToLeaderBoard(name, totalTime, imageId) {
  try {
    const User = await prisma.leaderboard.create({
      data: {
        user: name,
        time: totalTime,
        imageId,
      },
    });

    return User;
  } catch (err) {
    console.error(err);
  }
}

async function fetchLeaderboard(imageId) {
  try {
    const leaderboard = await prisma.leaderboard.findMany({
      where: { imageId },
      orderBy: { time: "asc" },
    });
    return leaderboard;
  } catch (err) {
    console.error(err);
  }
}

async function fetchImages() {
  try {
    const Images = await prisma.image.findMany();
    return Images;
  } catch (err) {
    console.error(err);
  }
}

async function fetchImage(pictureName) {
  try {
    const image = await prisma.image.findFirst({
      where: {
        name: pictureName,
      },
    });
    return image;
  } catch (err) {
    console.error(err);
  }
}

async function fetchCharacters(id) {
  try {
    const characters = await prisma.character.findMany({
      where: {
        imageId: id,
      },
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
  fetchImages,
  fetchCharacters,
};
