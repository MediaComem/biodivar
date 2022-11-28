/*
  Warnings:

  - You are about to drop the `Symbol` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `symbol_id` on the `Position` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Symbol_poi_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Symbol";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Position" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "distance" REAL NOT NULL DEFAULT 0,
    "rotation" REAL NOT NULL DEFAULT 0,
    "elevation" REAL NOT NULL DEFAULT 0,
    "media_id" INTEGER,
    "poi_id" INTEGER,
    CONSTRAINT "Position_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "Poi" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Position_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Position" ("distance", "elevation", "id", "media_id", "poi_id", "rotation") SELECT "distance", "elevation", "id", "media_id", "poi_id", "rotation" FROM "Position";
DROP TABLE "Position";
ALTER TABLE "new_Position" RENAME TO "Position";
CREATE UNIQUE INDEX "Position_media_id_key" ON "Position"("media_id");
CREATE UNIQUE INDEX "Position_poi_id_key" ON "Position"("poi_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
