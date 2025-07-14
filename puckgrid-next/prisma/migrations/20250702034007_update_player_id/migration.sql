-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "player_id_seq";

-- AlterTable
ALTER TABLE "PlayerTeam" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "PlayerTeam_id_seq";
