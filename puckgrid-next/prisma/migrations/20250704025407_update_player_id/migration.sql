/*
  Warnings:

  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "PlayerTeam" DROP CONSTRAINT "PlayerTeam_teamId_fkey";

-- DropIndex
DROP INDEX "Team_abbreviation_key";

-- AlterTable
CREATE SEQUENCE player_id_seq;
ALTER TABLE "Player" ALTER COLUMN "id" SET DEFAULT nextval('player_id_seq');
ALTER SEQUENCE player_id_seq OWNED BY "Player"."id";

-- AlterTable
CREATE SEQUENCE playerteam_id_seq;
ALTER TABLE "PlayerTeam" ALTER COLUMN "id" SET DEFAULT nextval('playerteam_id_seq'),
ALTER COLUMN "teamId" SET DATA TYPE TEXT;
ALTER SEQUENCE playerteam_id_seq OWNED BY "PlayerTeam"."id";

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "team_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Team_id_key" ON "Team"("id");

-- AddForeignKey
ALTER TABLE "PlayerTeam" ADD CONSTRAINT "PlayerTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
