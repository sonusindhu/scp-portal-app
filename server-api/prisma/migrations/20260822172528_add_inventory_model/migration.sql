-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "packageId" TEXT,
    "trackingNumber" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "type" TEXT,
    "deviceType" TEXT,
    "status" TEXT,
    "length" DOUBLE PRECISION,
    "width" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "lwhType" TEXT DEFAULT 'in',
    "weight" DOUBLE PRECISION,
    "weightType" TEXT DEFAULT 'lb',
    "location" TEXT,
    "notes" TEXT,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_trackingNumber_key" ON "Inventory"("trackingNumber");

-- CreateIndex
CREATE INDEX "Inventory_companyId_idx" ON "Inventory"("companyId");

-- CreateIndex
CREATE INDEX "Inventory_trackingNumber_idx" ON "Inventory"("trackingNumber");
