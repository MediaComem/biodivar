-- CreateTable
CREATE TABLE "Biovers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "owner" INTEGER NOT NULL,
    "creation_date" DATETIME NOT NULL,
    "update_date" DATETIME,
    "deleted_date" DATETIME,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Biovers_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
