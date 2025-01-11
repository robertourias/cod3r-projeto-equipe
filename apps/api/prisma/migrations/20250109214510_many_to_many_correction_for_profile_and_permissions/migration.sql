-- DropIndex
DROP INDEX "profile_permissions_profileId_permissionId_idx";

-- DropIndex
DROP INDEX "user_permissions_userId_permissionId_idx";

-- DropIndex
DROP INDEX "user_profile_userId_profileId_idx";

-- AlterTable
ALTER TABLE "audits" ADD COLUMN "beforeUpdate" TEXT;
