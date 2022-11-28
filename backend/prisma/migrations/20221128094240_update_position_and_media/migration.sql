/*
  Warnings:

  - You are about to drop the `Position` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Position_poi_id_key";

-- DropIndex
DROP INDEX "Position_media_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Position";
PRAGMA foreign_keys=on;

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
    "elevation" REAL NOT NULL DEFAULT 0,
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
CREATE TABLE "new_Media" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "text" TEXT,
    "url" TEXT,
    "media_type" TEXT,
    "is_facing" BOOLEAN NOT NULL DEFAULT true,
    "is_visible_in_radius" BOOLEAN NOT NULL DEFAULT true,
    "is_visible_out_radius" BOOLEAN NOT NULL DEFAULT true,
    "autoplay" BOOLEAN NOT NULL DEFAULT true,
    "loop" BOOLEAN NOT NULL DEFAULT false,
    "scale" REAL NOT NULL DEFAULT 1,
    "amplitude" REAL NOT NULL DEFAULT 0,
    "distance" REAL NOT NULL DEFAULT 0,
    "rotation" REAL NOT NULL DEFAULT 0,
    "elevation" REAL NOT NULL DEFAULT 0,
    "orientation" REAL NOT NULL DEFAULT 0,
    "metadata" TEXT,
    "creation_date" DATETIME NOT NULL,
    "update_date" DATETIME,
    "deleted_date" DATETIME,
    "poi_id" INTEGER,
    CONSTRAINT "Media_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "Poi" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Media" ("amplitude", "autoplay", "creation_date", "deleted_date", "id", "is_facing", "is_visible_in_radius", "is_visible_out_radius", "loop", "media_type", "metadata", "poi_id", "scale", "text", "update_date", "url") SELECT "amplitude", "autoplay", "creation_date", "deleted_date", "id", "is_facing", "is_visible_in_radius", "is_visible_out_radius", "loop", "media_type", "metadata", "poi_id", "scale", "text", "update_date", "url" FROM "Media";
DROP TABLE "Media";
ALTER TABLE "new_Media" RENAME TO "Media";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
