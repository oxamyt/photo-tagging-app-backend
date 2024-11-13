const prismaQueries = require("../prisma/prismaQueries");

async function verifyCoordinates(req, res) {
  const { character, x, y } = req.body;

  const radius = 50;

  try {
    const Character = await prismaQueries.fetchCharacter(character);
    if (!Character) {
      return res.json({ message: "Character not found!", success: false });
    }

    const withinXBounds =
      x >= Character.x - radius && x <= Character.x + radius;
    const withinYBounds =
      y >= Character.y - radius && y <= Character.y + radius;

    if (withinXBounds && withinYBounds) {
      return res.json({
        message: "Correct!",
        success: true,
        correctCoordinates: { x: Character.x, y: Character.y },
      });
    } else {
      return res.json({
        message: "Incorrect!",
        success: false,
      });
    }
  } catch (err) {
    console.error("Error verifying coordinates:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
}

async function fetchGameData(req, res) {
  try {
    const image = await prismaQueries.fetchImage();
    const characters = await prismaQueries.fetchCharacters();

    res.status(200).json({
      image: image.url,
      characters: characters,
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  verifyCoordinates,
  fetchGameData,
};
