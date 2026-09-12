-- AlterTable
ALTER TABLE "User" ADD COLUMN     "department" TEXT,
ADD COLUMN     "emailProofToken" TEXT,
ADD COLUMN     "emailProofTokenExpiresAt" INTEGER,
ADD COLUMN     "extension" TEXT,
ADD COLUMN     "isAdmin" BOOLEAN DEFAULT false,
ADD COLUMN     "isSuperAdmin" BOOLEAN DEFAULT false,
ADD COLUMN     "jobTitle" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "passwordResetToken" TEXT,
ADD COLUMN     "passwordResetTokenExpiresAt" INTEGER,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "userImage" TEXT;
