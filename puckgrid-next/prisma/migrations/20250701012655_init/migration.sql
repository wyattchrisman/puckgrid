/*
  Warnings:

  - Added the required column `careerAssists` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `careerGoals` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gamesPlayed` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heightInches` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shootsCatches` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weightPounds` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "careerAssists" INTEGER NOT NULL,
ADD COLUMN     "careerGoals" INTEGER NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "gamesPlayed" INTEGER NOT NULL,
ADD COLUMN     "heightInches" INTEGER NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "shootsCatches" TEXT NOT NULL,
ADD COLUMN     "weightPounds" INTEGER NOT NULL;
