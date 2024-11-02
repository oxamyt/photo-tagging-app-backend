const express = require("express");
const cors = require("cors");
const app = express();
const gameRouter = require("./routes/gameRouter");
const timerRouter = require("./routes/timerRouter");
const cookieParser = require("cookie-parser");

const port = 3000;

app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", gameRouter);
app.use("/timer/", timerRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
