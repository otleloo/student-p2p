/*
  Warnings:

  - Added the required column `durationHours` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationMinutes` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "unit" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tokenCost" INTEGER NOT NULL,
    "tokenType" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL,
    "venueId" TEXT NOT NULL,
    "durationHours" INTEGER NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "creatorId" TEXT NOT NULL,
    CONSTRAINT "Course_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Course_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("createdAt", "creatorId", "dateTime", "description", "id", "title", "tokenCost", "tokenType", "unit", "updatedAt", "venueId") SELECT "createdAt", "creatorId", "dateTime", "description", "id", "title", "tokenCost", "tokenType", "unit", "updatedAt", "venueId" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
