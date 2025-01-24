/*
  Warnings:

  - A unique constraint covering the columns `[profileId,permissionId]` on the table `profile_permissions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "profile_permissions_profileId_permissionId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "profile_permissions_profileId_permissionId_key" ON "profile_permissions"("profileId", "permissionId");
