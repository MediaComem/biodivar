-- CreateTable
CREATE TABLE "Path" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "author" INTEGER NOT NULL,
    "creation_date" DATETIME NOT NULL,
    "update_date" DATETIME,
    "deleted_date" DATETIME,
    "last_contributor" INTEGER,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "is_editable" BOOLEAN NOT NULL DEFAULT false,
    "biovers" INTEGER NOT NULL,
    "style_type" TEXT NOT NULL,
    "style_stroke" BOOLEAN NOT NULL,
    "style_stroke_width" REAL NOT NULL,
    "style_elevation" REAL NOT NULL,
    "style_elevation_ground" REAL NOT NULL,
    "style_noise" REAL NOT NULL,
    "style_is_visible" BOOLEAN NOT NULL,
    "visible_from" REAL NOT NULL,
    "metadata" TEXT,
    CONSTRAINT "Path_biovers_fkey" FOREIGN KEY ("biovers") REFERENCES "Biovers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Path_author_fkey" FOREIGN KEY ("author") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Path_last_contributor_fkey" FOREIGN KEY ("last_contributor") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    CONSTRAINT "Coordinate_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "Poi" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Coordinate_path_id_fkey" FOREIGN KEY ("path_id") REFERENCES "Path" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Coordinate" ("alt", "creation_date", "deleted_date", "id", "lat", "long", "poi_id", "update_date") SELECT "alt", "creation_date", "deleted_date", "id", "lat", "long", "poi_id", "update_date" FROM "Coordinate";
DROP TABLE "Coordinate";
ALTER TABLE "new_Coordinate" RENAME TO "Coordinate";
CREATE UNIQUE INDEX "Coordinate_poi_id_key" ON "Coordinate"("poi_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
