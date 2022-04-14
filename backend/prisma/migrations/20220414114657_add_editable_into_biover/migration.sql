-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Biovers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "owner" INTEGER NOT NULL,
    "creation_date" DATETIME NOT NULL,
    "update_date" DATETIME,
    "deleted_date" DATETIME,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "is_editable" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Biovers_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Biovers" ("creation_date", "deleted_date", "id", "is_public", "name", "owner", "update_date") SELECT "creation_date", "deleted_date", "id", "is_public", "name", "owner", "update_date" FROM "Biovers";
DROP TABLE "Biovers";
ALTER TABLE "new_Biovers" RENAME TO "Biovers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
