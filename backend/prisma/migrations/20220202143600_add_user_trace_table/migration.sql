-- CreateTable
CREATE TABLE "UserTrace" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creation_date" DATETIME NOT NULL,
    "update_date" DATETIME,
    "deleted_date" DATETIME,
    "author" INTEGER NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "biovers" INTEGER NOT NULL,
    CONSTRAINT "UserTrace_biovers_fkey" FOREIGN KEY ("biovers") REFERENCES "Biovers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "user_trace_id" INTEGER,
    CONSTRAINT "Coordinate_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "Poi" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Coordinate_path_id_fkey" FOREIGN KEY ("path_id") REFERENCES "Path" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Coordinate_user_trace_id_fkey" FOREIGN KEY ("user_trace_id") REFERENCES "UserTrace" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Coordinate" ("alt", "creation_date", "deleted_date", "id", "lat", "long", "path_id", "poi_id", "update_date") SELECT "alt", "creation_date", "deleted_date", "id", "lat", "long", "path_id", "poi_id", "update_date" FROM "Coordinate";
DROP TABLE "Coordinate";
ALTER TABLE "new_Coordinate" RENAME TO "Coordinate";
CREATE UNIQUE INDEX "Coordinate_poi_id_key" ON "Coordinate"("poi_id");
CREATE UNIQUE INDEX "Coordinate_user_trace_id_key" ON "Coordinate"("user_trace_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
