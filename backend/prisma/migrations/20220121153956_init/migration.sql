-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Biovers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "owner" INTEGER NOT NULL,
    CONSTRAINT "Biovers_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Trace" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "autor" INTEGER NOT NULL,
    "creation_date" DATETIME NOT NULL,
    "is_public" BOOLEAN NOT NULL,
    "coordinate_id" INTEGER NOT NULL,
    "biovers" INTEGER NOT NULL,
    "action_id" INTEGER NOT NULL,
    CONSTRAINT "Trace_coordinate_id_fkey" FOREIGN KEY ("coordinate_id") REFERENCES "Coordinate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Trace_action_id_fkey" FOREIGN KEY ("action_id") REFERENCES "Action" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Trace_biovers_fkey" FOREIGN KEY ("biovers") REFERENCES "Biovers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Trace_autor_fkey" FOREIGN KEY ("autor") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Poi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "autor" INTEGER NOT NULL,
    "creation_date" DATETIME NOT NULL,
    "update_data" DATETIME NOT NULL,
    "last_contributor" INTEGER NOT NULL,
    "is_public" BOOLEAN NOT NULL,
    "coordinate_id" INTEGER NOT NULL,
    "biovers" INTEGER NOT NULL,
    "radius" REAL NOT NULL,
    "visible_from" REAL NOT NULL,
    "trigger_mode" TEXT NOT NULL,
    "metadata" TEXT NOT NULL,
    CONSTRAINT "Poi_coordinate_id_fkey" FOREIGN KEY ("coordinate_id") REFERENCES "Coordinate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Poi_biovers_fkey" FOREIGN KEY ("biovers") REFERENCES "Biovers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Poi_autor_fkey" FOREIGN KEY ("autor") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Poi_last_contributor_fkey" FOREIGN KEY ("last_contributor") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Path" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "autor" INTEGER NOT NULL,
    "creation_date" DATETIME NOT NULL,
    "update_data" DATETIME NOT NULL,
    "last_contributor" INTEGER NOT NULL,
    "is_public" BOOLEAN NOT NULL,
    "is_editable" BOOLEAN NOT NULL,
    "coordinate_id" INTEGER NOT NULL,
    "biovers" INTEGER NOT NULL,
    "visible_from" REAL NOT NULL,
    "metadata" TEXT NOT NULL,
    CONSTRAINT "Path_coordinate_id_fkey" FOREIGN KEY ("coordinate_id") REFERENCES "Coordinate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Path_biovers_fkey" FOREIGN KEY ("biovers") REFERENCES "Biovers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Path_autor_fkey" FOREIGN KEY ("autor") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Path_last_contributor_fkey" FOREIGN KEY ("last_contributor") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Action" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "poi" INTEGER NOT NULL,
    "path" INTEGER NOT NULL,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "is_facing_user" BOOLEAN NOT NULL,
    "is_visible" BOOLEAN NOT NULL,
    "caption" TEXT NOT NULL,
    "caption_visible" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Style" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "stroke" BOOLEAN NOT NULL,
    "stroke_width" REAL NOT NULL,
    "fill" BOOLEAN NOT NULL,
    "elevation" REAL NOT NULL,
    "height" REAL NOT NULL,
    "noise" REAL NOT NULL,
    "is_public" BOOLEAN NOT NULL,
    "poi" INTEGER,
    "path" INTEGER,
    CONSTRAINT "Style_poi_fkey" FOREIGN KEY ("poi") REFERENCES "Poi" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Style_path_fkey" FOREIGN KEY ("path") REFERENCES "Path" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "biovers" INTEGER NOT NULL,
    CONSTRAINT "Settings_biovers_fkey" FOREIGN KEY ("biovers") REFERENCES "Biovers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Coordinate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "long" REAL NOT NULL,
    "lat" REAL NOT NULL,
    "alt" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Symbol" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "media_type_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "elevation_ground" REAL NOT NULL,
    "is_facing_user" BOOLEAN NOT NULL,
    "is_visible" BOOLEAN NOT NULL,
    "poi" INTEGER,
    CONSTRAINT "Symbol_media_type_id_fkey" FOREIGN KEY ("media_type_id") REFERENCES "MediaType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Symbol_poi_fkey" FOREIGN KEY ("poi") REFERENCES "Poi" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Media" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "media_type_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "elevation_ground" REAL NOT NULL,
    "is_facing_user" BOOLEAN NOT NULL,
    "is_visible" BOOLEAN NOT NULL,
    "caption" TEXT NOT NULL,
    "caption_visible" BOOLEAN NOT NULL,
    "poi" INTEGER,
    CONSTRAINT "Media_media_type_id_fkey" FOREIGN KEY ("media_type_id") REFERENCES "MediaType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Media_poi_fkey" FOREIGN KEY ("poi") REFERENCES "Poi" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MediaType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Trace_coordinate_id_key" ON "Trace"("coordinate_id");

-- CreateIndex
CREATE UNIQUE INDEX "Trace_action_id_key" ON "Trace"("action_id");

-- CreateIndex
CREATE UNIQUE INDEX "Poi_coordinate_id_key" ON "Poi"("coordinate_id");

-- CreateIndex
CREATE UNIQUE INDEX "Path_coordinate_id_key" ON "Path"("coordinate_id");

-- CreateIndex
CREATE UNIQUE INDEX "Style_poi_key" ON "Style"("poi");

-- CreateIndex
CREATE UNIQUE INDEX "Style_path_key" ON "Style"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_biovers_key" ON "Settings"("biovers");

-- CreateIndex
CREATE UNIQUE INDEX "Symbol_poi_key" ON "Symbol"("poi");

-- CreateIndex
CREATE UNIQUE INDEX "Media_poi_key" ON "Media"("poi");
