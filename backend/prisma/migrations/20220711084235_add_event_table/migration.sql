-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creation_date" DATETIME NOT NULL,
    "deleted_date" DATETIME,
    "author" INTEGER NOT NULL,
    "biovers" INTEGER NOT NULL,
    "data" TEXT NOT NULL,
    CONSTRAINT "Event_author_fkey" FOREIGN KEY ("author") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Event_biovers_fkey" FOREIGN KEY ("biovers") REFERENCES "Biovers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
