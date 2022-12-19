/*
  Warnings:

  - You are about to drop the column `style_elevation` on the `Path` table. All the data in the column will be lost.
  - You are about to drop the column `style_stroke` on the `Path` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Path" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "author" INTEGER NOT NULL,
    "creation_date" DATETIME NOT NULL,
    "update_date" DATETIME,
    "deleted_date" DATETIME,
    "last_contributor" INTEGER,
    "biovers" INTEGER NOT NULL,
    "style_type" TEXT NOT NULL,
    "style_stroke_width" REAL NOT NULL DEFAULT 1,
    "stroke_color" TEXT NOT NULL DEFAULT '#FFFFFF',
    "stroke_opacity" INTEGER NOT NULL DEFAULT 100,
    "amplitude" REAL NOT NULL DEFAULT 0,
    "elevation" REAL NOT NULL DEFAULT 0,
    "style_is_visible" BOOLEAN NOT NULL DEFAULT true,
    "scope" REAL NOT NULL DEFAULT 50,
    "metadata" TEXT,
    CONSTRAINT "Path_author_fkey" FOREIGN KEY ("author") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Path_last_contributor_fkey" FOREIGN KEY ("last_contributor") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Path_biovers_fkey" FOREIGN KEY ("biovers") REFERENCES "Biovers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Path" ("amplitude", "author", "biovers", "creation_date", "deleted_date", "id", "last_contributor", "metadata", "scope", "style_is_visible", "style_stroke_width", "style_type", "update_date") SELECT "amplitude", "author", "biovers", "creation_date", "deleted_date", "id", "last_contributor", "metadata", "scope", "style_is_visible", "style_stroke_width", "style_type", "update_date" FROM "Path";
DROP TABLE "Path";
ALTER TABLE "new_Path" RENAME TO "Path";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
