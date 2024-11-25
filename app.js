const express = require("express");
const cors = require("cors");
const app = express();
const gameRouter = require("./routes/gameRouter");
const timerRouter = require("./routes/timerRouter");
const leaderboardRouter = require("./routes/leaderboardRouter");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const session = require("express-session");
const MemoryStore = require("memorystore")(session);

const port = 3000;

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND,
    credentials: true,
  })
);

const isProduction = process.env.NODE_ENV === "production";
app.use(
  session({
    cookie: {
      maxAge: 86400000, // 24 hours
      secure: isProduction, // Secure cookies in production only
      sameSite: isProduction ? "None" : "Lax", // SameSite=None for cross-site cookies, Lax for local dev
    },
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    resave: false,
    secret: process.env.SECRET,
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
