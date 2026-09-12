-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mainContactId" INTEGER,
ADD COLUMN     "updatedBy" INTEGER;
