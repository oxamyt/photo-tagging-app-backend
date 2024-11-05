const { Router } = require("express");
const timerController = require("../controllers/timerController");

const timeRouter = Router();

timeRouter.post("/timer/start", timerController.startTimer);

timeRouter.post("/timer/end", timerController.endTimer);

timeRouter.post("/timer/record", timerController.recordTime);

module.exports = timeRouter;
