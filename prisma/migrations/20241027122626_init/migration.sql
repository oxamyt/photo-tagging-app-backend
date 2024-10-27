-- CreateTable
CREATE TABLE "Leaderboard" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "time" INTEGER NOT NULL,

    CONSTRAINT "Leaderboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "character" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
