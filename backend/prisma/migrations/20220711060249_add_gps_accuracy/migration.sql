/*
  Warnings:

  - Added the required column `gps_accuracy` to the `UserTrace` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserTrace" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creation_date" DATETIME NOT NULL,
    "update_date" DATETIME,
    "deleted_date" DATETIME,
    "author" INTEGER NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "gps_accuracy" REAL NOT NULL,
    "biovers" INTEGER NOT NULL,
    CONSTRAINT "UserTrace_biovers_fkey" FOREIGN KEY ("biovers") REFERENCES "Biovers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserTrace" ("author", "biovers", "creation_date", "deleted_date", "id", "is_public", "update_date") SELECT "author", "biovers", "creation_date", "deleted_date", "id", "is_public", "update_date" FROM "UserTrace";
DROP TABLE "UserTrace";
ALTER TABLE "new_UserTrace" RENAME TO "UserTrace";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
