-- CreateTable
CREATE TABLE "audits" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "moduleName" TEXT,
    "useCase" TEXT,
    "userId" TEXT,
    "message" TEXT,
    "requestData" TEXT,
    "responseData" TEXT,
    "host" TEXT,
    "userAgent" TEXT,
    CONSTRAINT "audits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
