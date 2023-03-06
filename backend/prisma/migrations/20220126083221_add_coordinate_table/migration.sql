-- CreateTable
CREATE TABLE "Coordinate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "long" REAL NOT NULL,
    "lat" REAL NOT NULL,
    "alt" REAL NOT NULL,
    "creation_date" DATETIME NOT NULL,
    "update_date" DATETIME,
    "deleted_date" DATETIME,
    "poi_id" INTEGER,
    CONSTRAINT "Coordinate_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "Poi" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Coordinate_poi_id_key" ON "Coordinate"("poi_id");
