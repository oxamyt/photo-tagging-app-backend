const express = require("express");
const cors = require("cors");
const app = express();
const gameRouter = require("./routes/gameRouter");
const timerRouter = require("./routes/timerRouter");
const leaderboardRouter = require("./routes/leaderboardRouter");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const port = 3000;

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: false,
    },
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", gameRouter);
app.use("/timer", timerRouter);
app.use("/leaderboard", leaderboardRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
