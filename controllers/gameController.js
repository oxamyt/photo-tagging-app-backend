const prismaQueries = require("../prisma/prismaQueries");

async function verifyCoordinates(req, res) {
  const { character, x, y } = req.body;
  const radius = 100;

  try {
    const Character = await prismaQueries.fetchCharacter(character);
    if (Character) {
      const withinXBounds =
        x >= Character.x - radius && x <= Character.x + radius;
      const withinYBounds =
        y >= Character.y - radius && y <= Character.y + radius;

      if (withinXBounds && withinYBounds) {
        res.json({ message: "Correct!", success: true });
      } else {
        res.json({ message: "Incorrect!", success: false });
      }
    } else {
      res.json({ messgae: "Character not found!", success: false });
    }
  } catch (err) {
    console.error("Error verifying coordinates:", err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
}

module.exports = {
  verifyCoordinates,
};
