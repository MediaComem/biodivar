/*
  Warnings:

  - You are about to drop the column `subtitle_is_visible` on the `Poi` table. All the data in the column will be lost.
  - You are about to drop the column `title_is_visible` on the `Poi` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Poi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "subtitle" TEXT,
    "author" INTEGER NOT NULL,
    "creation_date" DATETIME NOT NULL,
    "update_date" DATETIME,
    "deleted_date" DATETIME,
    "last_contributor" INTEGER,
    "biovers" INTEGER NOT NULL,
    "scope" REAL NOT NULL DEFAULT 50,
    "trigger_mode" TEXT NOT NULL,
    "style_type" TEXT NOT NULL,
    "extrusion" REAL NOT NULL DEFAULT 0,
    "radius" REAL NOT NULL DEFAULT 0,
    "style_stroke_width" REAL NOT NULL DEFAULT 1,
    "stroke_color" TEXT NOT NULL DEFAULT '#FFFFFF',
    "stroke_opacity" INTEGER NOT NULL DEFAULT 100,
    "fill_type" BOOLEAN NOT NULL DEFAULT false,
    "fill_color" TEXT NOT NULL DEFAULT '#FFFFFF',
    "fill_opacity" INTEGER NOT NULL DEFAULT 100,
    "amplitude" REAL NOT NULL DEFAULT 0,
    "wireframe" BOOLEAN NOT NULL DEFAULT false,
    "map_media_type" TEXT,
    "map_url" TEXT,
    "metadata" TEXT,
    CONSTRAINT "Poi_author_fkey" FOREIGN KEY ("author") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Poi_last_contributor_fkey" FOREIGN KEY ("last_contributor") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Poi_biovers_fkey" FOREIGN KEY ("biovers") REFERENCES "Biovers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Poi" ("amplitude", "author", "biovers", "creation_date", "deleted_date", "extrusion", "fill_color", "fill_opacity", "fill_type", "id", "last_contributor", "map_media_type", "map_url", "metadata", "radius", "scope", "stroke_color", "stroke_opacity", "style_stroke_width", "style_type", "subtitle", "title", "trigger_mode", "update_date", "wireframe") SELECT "amplitude", "author", "biovers", "creation_date", "deleted_date", "extrusion", "fill_color", "fill_opacity", "fill_type", "id", "last_contributor", "map_media_type", "map_url", "metadata", "radius", "scope", "stroke_color", "stroke_opacity", "style_stroke_width", "style_type", "subtitle", "title", "trigger_mode", "update_date", "wireframe" FROM "Poi";
DROP TABLE "Poi";
ALTER TABLE "new_Poi" RENAME TO "Poi";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
