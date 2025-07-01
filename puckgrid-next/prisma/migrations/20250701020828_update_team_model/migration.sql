/*
  Warnings:

  - Added the required column `birthDate` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE player_id_seq;
ALTER TABLE "Player" ADD COLUMN     "birthDate" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('player_id_seq');
ALTER SEQUENCE player_id_seq OWNED BY "Player"."id";

-- AlterTable
CREATE SEQUENCE team_id_seq;
ALTER TABLE "Team" ALTER COLUMN "id" SET DEFAULT nextval('team_id_seq');
ALTER SEQUENCE team_id_seq OWNED BY "Team"."id";
