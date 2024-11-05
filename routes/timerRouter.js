const { Router } = require("express");
const timerController = require("../controllers/timerController");

const timeRouter = Router();

timeRouter.post("/start", timerController.startTimer);

timeRouter.post("/end", timerController.endTimer);

timeRouter.post("/record", timerController.recordTime);

module.exports = timeRouter;
