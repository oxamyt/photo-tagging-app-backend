/*
  Warnings:

  - You are about to drop the column `character` on the `Character` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Character_character_key";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "character",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");
