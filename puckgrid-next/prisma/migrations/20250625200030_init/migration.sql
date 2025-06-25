-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "picture" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" INTEGER NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerTeam" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "season" TEXT NOT NULL,

    CONSTRAINT "PlayerTeam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlayerTeam_playerId_teamId_season_key" ON "PlayerTeam"("playerId", "teamId", "season");

-- AddForeignKey
ALTER TABLE "PlayerTeam" ADD CONSTRAINT "PlayerTeam_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerTeam" ADD CONSTRAINT "PlayerTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
