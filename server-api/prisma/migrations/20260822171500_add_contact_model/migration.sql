-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "fullName" TEXT,
    "email" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "status" TEXT,
    "department" TEXT,
    "jobTitle" TEXT,
    "phone" TEXT,
    "extension" TEXT,
    "address1" TEXT,
    "address2" TEXT,
    "city" TEXT,
    "zipcode" TEXT,
    "state" TEXT,
    "country" TEXT,
    "birthDate" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Contact_companyId_idx" ON "Contact"("companyId");

-- CreateIndex
CREATE INDEX "Contact_email_idx" ON "Contact"("email");
