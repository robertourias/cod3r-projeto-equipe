/*
  Warnings:

  - A unique constraint covering the columns `[userId,permissionId]` on the table `user_permissions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,profileId]` on the table `user_profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_permissions_userId_permissionId_key" ON "user_permissions"("userId", "permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_userId_profileId_key" ON "user_profile"("userId", "profileId");
