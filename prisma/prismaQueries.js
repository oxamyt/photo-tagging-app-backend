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
    throw new Error("Could not create the post.");
  }
}

module.exports = { fetchCharacter };
