-- AlterTable
ALTER TABLE "Activities" ADD COLUMN     "equipment" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "health" TEXT[] DEFAULT ARRAY[]::TEXT[];
