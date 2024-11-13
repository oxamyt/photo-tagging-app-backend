const { Router } = require("express");
const timerController = require("../controllers/timerController");

const timeRouter = Router();

timeRouter.post("/start", timerController.startTimer);

timeRouter.post("/end", timerController.endTimer);

module.exports = timeRouter;
