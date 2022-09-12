/*
  Warnings:

  - You are about to drop the column `elevation_ground` on the `Symbol` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `Symbol` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `Symbol` table. All the data in the column will be lost.
  - You are about to drop the column `is_editable` on the `Poi` table. All the data in the column will be lost.
  - You are about to drop the column `is_public` on the `Poi` table. All the data in the column will be lost.
  - You are about to drop the column `style_elevation` on the `Poi` table. All the data in the column will be lost.
  - You are about to drop the column `style_elevation_ground` on the `Poi` table. All the data in the column will be lost.
  - You are about to drop the column `style_fill` on the `Poi` table. All the data in the column will be lost.
  - You are about to drop the column `style_is_visible` on the `Poi` table. All the data in the column will be lost.
  - You are about to drop the column `style_noise` on the `Poi` table. All the data in the column will be lost.
  - You are about to drop the column `style_stroke` on the `Poi` table. All the data in the column will be lost.
  - You are about to drop the column `visible_from` on the `Poi` table. All the data in the column will be lost.
  - You are about to drop the column `update_date` on the `UserTrace` table. All the data in the column will be lost.
  - You are about to drop the column `is_editable` on the `Path` table. All the data in the column will be lost.
  - You are about to drop the column `is_public` on the `Path` table. All the data in the column will be lost.
  - You are about to drop the column `style_elevation_ground` on the `Path` table. All the data in the column will be lost.
  - You are about to drop the column `style_noise` on the `Path` table. All the data in the column will be lost.
  - You are about to drop the column `visible_from` on the `Path` table. All the data in the column will be lost.
  - You are about to drop the column `caption` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `caption_visible` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `elevation_ground` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `is_facing_user` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `is_visible` on the `Media` table. All the data in the column will be lost.
  - Added the required column `gps_accuracy` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Biovers" ADD COLUMN "location" TEXT;

-- CreateTable
CREATE TABLE "Position" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phi" REAL NOT NULL DEFAULT 0,
    "sigma" REAL NOT NULL DEFAULT 0,
    "z" REAL NOT NULL DEFAULT 0,
    "media_id" INTEGER,
    "symbol_id" INTEGER,
    "poi_id" INTEGER,
    CONSTRAINT "Position_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "Poi" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Position_symbol_id_fkey" FOREIGN KEY ("symbol_id") REFERENCES "Symbol" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Position_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Symbol" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "media_type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "media_type_ar" TEXT,
    "ar_url" TEXT,
    "media_type_audio" TEXT,
    "audio_url" TEXT,
    "is_facing_user" BOOLEAN NOT NULL DEFAULT true,
    "is_visible" BOOLEAN NOT NULL DEFAULT true,
    "is_visible_ar" BOOLEAN NOT NULL DEFAULT true,
    "audio_autoplay" BOOLEAN NOT NULL DEFAULT false,
    "audio_loop" BOOLEAN NOT NULL DEFAULT false,
    "audio_distance" REAL NOT NULL DEFAULT 0,
    "autoplay" BOOLEAN NOT NULL DEFAULT true,
    "loop" BOOLEAN NOT NULL DEFAULT true,
    "scale" REAL NOT NULL DEFAULT 1,
    "wireframe" BOOLEAN NOT NULL DEFAULT false,
    "amplitude" REAL NOT NULL DEFAULT 0,
    "creation_date" DATETIME NOT NULL,
    "update_date" DATETIME,
    "deleted_date" DATETIME,
    "poi_id" INTEGER,
    CONSTRAINT "Symbol_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "Poi" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Symbol" ("ar_url", "creation_date", "deleted_date", "id", "is_facing_user", "is_visible", "media_type", "media_type_ar", "poi_id", "update_date", "url") SELECT "ar_url", "creation_date", "deleted_date", "id", "is_facing_user", "is_visible", "media_type", "media_type_ar", "poi_id", "update_date", "url" FROM "Symbol";
DROP TABLE "Symbol";
ALTER TABLE "new_Symbol" RENAME TO "Symbol";
CREATE UNIQUE INDEX "Symbol_poi_id_key" ON "Symbol"("poi_id");
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creation_date" DATETIME NOT NULL,
    "deleted_date" DATETIME,
    "author" INTEGER NOT NULL,
    "biovers" INTEGER NOT NULL,
    "gps_accuracy" REAL NOT NULL,
    "data" TEXT NOT NULL,
    CONSTRAINT "Event_author_fkey" FOREIGN KEY ("author") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Event_biovers_fkey" FOREIGN KEY ("biovers") REFERENCES "Biovers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("author", "biovers", "creation_date", "data", "deleted_date", "id") SELECT "author", "biovers", "creation_date", "data", "deleted_date", "id" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE TABLE "new_Poi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "title_is_visible" BOOLEAN DEFAULT false,
    "subtitle" TEXT,
    "subtitle_is_visible" BOOLEAN DEFAULT false,
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
    "metadata" TEXT,
    CONSTRAINT "Poi_author_fkey" FOREIGN KEY ("author") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Poi_last_contributor_fkey" FOREIGN KEY ("last_contributor") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Poi_biovers_fkey" FOREIGN KEY ("biovers") REFERENCES "Biovers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Poi" ("author", "biovers", "creation_date", "deleted_date", "id", "last_contributor", "metadata", "radius", "style_stroke_width", "style_type", "subtitle", "subtitle_is_visible", "title", "title_is_visible", "trigger_mode", "update_date") SELECT "author", "biovers", "creation_date", "deleted_date", "id", "last_contributor", "metadata", "radius", "style_stroke_width", "style_type", "subtitle", "subtitle_is_visible", "title", "title_is_visible", "trigger_mode", "update_date" FROM "Poi";
DROP TABLE "Poi";
ALTER TABLE "new_Poi" RENAME TO "Poi";
CREATE TABLE "new_UserTrace" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creation_date" DATETIME NOT NULL,
    "deleted_date" DATETIME,
    "author" INTEGER NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "gps_accuracy" REAL NOT NULL,
    "biovers" INTEGER NOT NULL,
    CONSTRAINT "UserTrace_author_fkey" FOREIGN KEY ("author") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserTrace_biovers_fkey" FOREIGN KEY ("biovers") REFERENCES "Biovers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserTrace" ("author", "biovers", "creation_date", "deleted_date", "gps_accuracy", "id", "is_public") SELECT "author", "biovers", "creation_date", "deleted_date", "gps_accuracy", "id", "is_public" FROM "UserTrace";
DROP TABLE "UserTrace";
ALTER TABLE "new_UserTrace" RENAME TO "UserTrace";
CREATE TABLE "new_Coordinate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "long" REAL NOT NULL,
    "lat" REAL NOT NULL,
    "alt" REAL NOT NULL,
    "creation_date" DATETIME NOT NULL,
    "update_date" DATETIME,
    "deleted_date" DATETIME,
    "poi_id" INTEGER,
    "path_id" INTEGER,
    "user_trace_id" INTEGER,
    "event_id" INTEGER,
    CONSTRAINT "Coordinate_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "Poi" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Coordinate_path_id_fkey" FOREIGN KEY ("path_id") REFERENCES "Path" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Coordinate_user_trace_id_fkey" FOREIGN KEY ("user_trace_id") REFERENCES "UserTrace" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Coordinate_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Coordinate" ("alt", "creation_date", "deleted_date", "id", "lat", "long", "path_id", "poi_id", "update_date", "user_trace_id") SELECT "alt", "creation_date", "deleted_date", "id", "lat", "long", "path_id", "poi_id", "update_date", "user_trace_id" FROM "Coordinate";
DROP TABLE "Coordinate";
ALTER TABLE "new_Coordinate" RENAME TO "Coordinate";
CREATE UNIQUE INDEX "Coordinate_poi_id_key" ON "Coordinate"("poi_id");
CREATE UNIQUE INDEX "Coordinate_user_trace_id_key" ON "Coordinate"("user_trace_id");
CREATE UNIQUE INDEX "Coordinate_event_id_key" ON "Coordinate"("event_id");
CREATE TABLE "new_Path" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "author" INTEGER NOT NULL,
    "creation_date" DATETIME NOT NULL,
    "update_date" DATETIME,
    "deleted_date" DATETIME,
    "last_contributor" INTEGER,
    "biovers" INTEGER NOT NULL,
    "style_type" TEXT NOT NULL,
    "style_stroke" BOOLEAN NOT NULL DEFAULT true,
    "style_stroke_width" REAL NOT NULL DEFAULT 1,
    "style_elevation" REAL NOT NULL DEFAULT 0,
    "amplitude" REAL NOT NULL DEFAULT 0,
    "style_is_visible" BOOLEAN NOT NULL DEFAULT true,
    "scope" REAL NOT NULL DEFAULT 50,
    "metadata" TEXT,
    CONSTRAINT "Path_author_fkey" FOREIGN KEY ("author") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Path_last_contributor_fkey" FOREIGN KEY ("last_contributor") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Path_biovers_fkey" FOREIGN KEY ("biovers") REFERENCES "Biovers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Path" ("author", "biovers", "creation_date", "deleted_date", "id", "last_contributor", "metadata", "style_elevation", "style_is_visible", "style_stroke", "style_stroke_width", "style_type", "update_date") SELECT "author", "biovers", "creation_date", "deleted_date", "id", "last_contributor", "metadata", "style_elevation", "style_is_visible", "style_stroke", "style_stroke_width", "style_type", "update_date" FROM "Path";
DROP TABLE "Path";
ALTER TABLE "new_Path" RENAME TO "Path";
CREATE TABLE "new_Media" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT,
    "url" TEXT,
    "media_type" TEXT,
    "is_facing" BOOLEAN NOT NULL DEFAULT true,
    "autoplay" BOOLEAN NOT NULL DEFAULT true,
    "loop" BOOLEAN NOT NULL DEFAULT false,
    "scale" REAL NOT NULL DEFAULT 1,
    "amplitude" REAL NOT NULL DEFAULT 0,
    "metadata" TEXT,
    "creation_date" DATETIME NOT NULL,
    "update_date" DATETIME,
    "deleted_date" DATETIME,
    "poi_id" INTEGER,
    CONSTRAINT "Media_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "Poi" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Media" ("creation_date", "deleted_date", "id", "media_type", "poi_id", "update_date", "url") SELECT "creation_date", "deleted_date", "id", "media_type", "poi_id", "update_date", "url" FROM "Media";
DROP TABLE "Media";
ALTER TABLE "new_Media" RENAME TO "Media";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Position_media_id_key" ON "Position"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "Position_symbol_id_key" ON "Position"("symbol_id");

-- CreateIndex
CREATE UNIQUE INDEX "Position_poi_id_key" ON "Position"("poi_id");
