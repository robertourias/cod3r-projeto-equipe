-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_permissions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "disabledAt" DATETIME
);
INSERT INTO "new_permissions" ("createdAt", "description", "disabledAt", "id", "name", "updatedAt") SELECT "createdAt", "description", "disabledAt", "id", "name", "updatedAt" FROM "permissions";
DROP TABLE "permissions";
ALTER TABLE "new_permissions" RENAME TO "permissions";
CREATE UNIQUE INDEX "permissions_name_key" ON "permissions"("name");
CREATE TABLE "new_profiles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "disabledAt" DATETIME
);
INSERT INTO "new_profiles" ("createdAt", "description", "disabledAt", "id", "name", "updatedAt") SELECT "createdAt", "description", "disabledAt", "id", "name", "updatedAt" FROM "profiles";
DROP TABLE "profiles";
ALTER TABLE "new_profiles" RENAME TO "profiles";
CREATE UNIQUE INDEX "profiles_name_key" ON "profiles"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
