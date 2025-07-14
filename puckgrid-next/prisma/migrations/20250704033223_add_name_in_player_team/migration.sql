/*
  Warnings:

  - Added the required column `playerName` to the `PlayerTeam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlayerTeam" ADD COLUMN     "playerName" TEXT NOT NULL;
