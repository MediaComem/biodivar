-- CreateTable
CREATE TABLE "Media" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "media_type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "elevation_ground" REAL NOT NULL,
    "is_facing_user" BOOLEAN NOT NULL,
    "is_visible" BOOLEAN NOT NULL,
    "caption" TEXT NOT NULL,
    "caption_visible" BOOLEAN NOT NULL,
    "creation_date" DATETIME NOT NULL,
    "update_date" DATETIME,
    "deleted_date" DATETIME,
    "poi_id" INTEGER,
    CONSTRAINT "Media_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "Poi" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
