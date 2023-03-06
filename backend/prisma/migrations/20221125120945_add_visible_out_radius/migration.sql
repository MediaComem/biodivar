-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Media" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
    "metadata" TEXT,
    "creation_date" DATETIME NOT NULL,
    "update_date" DATETIME,
    "deleted_date" DATETIME,
    "poi_id" INTEGER,
    CONSTRAINT "Media_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "Poi" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Media" ("amplitude", "autoplay", "creation_date", "deleted_date", "id", "is_facing", "is_visible_in_radius", "loop", "media_type", "metadata", "poi_id", "scale", "text", "update_date", "url") SELECT "amplitude", "autoplay", "creation_date", "deleted_date", "id", "is_facing", "is_visible_in_radius", "loop", "media_type", "metadata", "poi_id", "scale", "text", "update_date", "url" FROM "Media";
DROP TABLE "Media";
ALTER TABLE "new_Media" RENAME TO "Media";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
