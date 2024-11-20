const prismaQueries = require("../prisma/prismaQueries");

async function verifyCoordinates(req, res) {
  const { character, x, y } = req.body;
  console.log(x, y);
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
        success: true,
        correctCoordinates: { x: Character.x, y: Character.y },
      });
    } else {
      return res.json({
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
    const { pictureName } = req.body;
    const image = await prismaQueries.fetchImage(pictureName);
    const characters = await prismaQueries.fetchCharacters(image.id);

    res.status(200).json({
      image: image.url,
      characters: characters,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  verifyCoordinates,
  fetchGameData,
};
