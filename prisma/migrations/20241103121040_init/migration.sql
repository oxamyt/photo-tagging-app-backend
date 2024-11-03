/*
  Warnings:

  - A unique constraint covering the columns `[user]` on the table `Leaderboard` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "startTime" DECIMAL(65,30) NOT NULL,
    "totalTime" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Leaderboard_user_key" ON "Leaderboard"("user");
