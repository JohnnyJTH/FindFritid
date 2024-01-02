-- CreateEnum
CREATE TYPE "Permissions" AS ENUM ('Admin', 'User');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "permissions" "Permissions"[] DEFAULT ARRAY['User']::"Permissions"[];
