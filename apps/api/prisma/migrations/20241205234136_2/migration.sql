-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "phone" TEXT,
    "profileUrl" TEXT,
    "recoveryToken" TEXT,
    "tokenExpiration" TEXT,
    "twoFactorAuth" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "disabledAt" DATETIME
);
INSERT INTO "new_users" ("createdAt", "disabledAt", "email", "id", "name", "password", "phone", "profileUrl", "recoveryToken", "tokenExpiration", "twoFactorAuth", "updatedAt") SELECT "createdAt", "disabledAt", "email", "id", "name", "password", "phone", "profileUrl", "recoveryToken", "tokenExpiration", "twoFactorAuth", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
