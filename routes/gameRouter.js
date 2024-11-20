const { Router } = require("express");
const gameController = require("../controllers/gameController");

const gameRouter = Router();

gameRouter.post("/game", gameController.verifyCoordinates);

gameRouter.post("/game-data", gameController.fetchGameData);

module.exports = gameRouter;
