-- CreateTable
CREATE TABLE "CentralFund" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "silverCoins" INTEGER NOT NULL DEFAULT 0,
    "goldCoins" INTEGER NOT NULL DEFAULT 0,
    "diamondCoins" INTEGER NOT NULL DEFAULT 0
);
