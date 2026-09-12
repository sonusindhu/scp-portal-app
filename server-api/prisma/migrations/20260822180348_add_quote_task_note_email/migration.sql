-- CreateTable
CREATE TABLE "Quote" (
    "id" SERIAL NOT NULL,
    "quoteNumber" TEXT,
    "name" TEXT,
    "service" TEXT,
    "transportMode" TEXT,
    "status" TEXT,
    "totalCost" DOUBLE PRECISION,
    "totalProfit" DOUBLE PRECISION,
    "expiryDate" TIMESTAMP(3),
    "totalMiles" DOUBLE PRECISION,
    "companyId" INTEGER,
    "contactId" INTEGER,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stop" (
    "id" SERIAL NOT NULL,
    "type" TEXT,
    "city" TEXT,
    "zipcode" TEXT,
    "state" TEXT,
    "country" TEXT,
    "miles" DOUBLE PRECISION,
    "quoteId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accessorial" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "quantity" DOUBLE PRECISION,
    "rate" DOUBLE PRECISION,
    "totalRate" DOUBLE PRECISION,
    "isIncludeInCharges" BOOLEAN DEFAULT false,
    "description" TEXT,
    "quoteId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Accessorial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CargoDetail" (
    "id" SERIAL NOT NULL,
    "equipmentId" INTEGER,
    "commodityId" INTEGER,
    "cargoTypeId" INTEGER,
    "weight" DOUBLE PRECISION,
    "cargoValue" DOUBLE PRECISION,
    "temperature" DOUBLE PRECISION,
    "pieces" INTEGER,
    "isHazmat" BOOLEAN DEFAULT false,
    "hazmatName" TEXT,
    "hazmatClass" TEXT,
    "hazmatUN" TEXT,
    "status" TEXT,
    "comments" TEXT,
    "quoteId" INTEGER NOT NULL,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CargoDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "type" TEXT,
    "subject" TEXT,
    "description" TEXT,
    "priority" TEXT,
    "dueDateTime" TIMESTAMP(3),
    "reminderDateTime" TIMESTAMP(3),
    "category" TEXT,
    "status" TEXT,
    "assignedTo" INTEGER,
    "pointOfContact" INTEGER,
    "quoteId" INTEGER,
    "companyId" INTEGER,
    "inventoryId" INTEGER,
    "userId" INTEGER,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "type" TEXT,
    "title" TEXT,
    "message" TEXT,
    "isCritical" BOOLEAN DEFAULT false,
    "quoteId" INTEGER,
    "contactId" INTEGER,
    "companyId" INTEGER,
    "inventoryId" INTEGER,
    "userId" INTEGER,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Email" (
    "id" SERIAL NOT NULL,
    "type" TEXT,
    "title" TEXT,
    "message" TEXT,
    "toEmail" TEXT,
    "fromEmail" TEXT,
    "isCritical" BOOLEAN DEFAULT false,
    "quoteId" INTEGER,
    "contactId" INTEGER,
    "companyId" INTEGER,
    "inventoryId" INTEGER,
    "userId" INTEGER,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Quote_quoteNumber_key" ON "Quote"("quoteNumber");

-- CreateIndex
CREATE INDEX "Quote_companyId_idx" ON "Quote"("companyId");

-- CreateIndex
CREATE INDEX "Quote_contactId_idx" ON "Quote"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "CargoDetail_quoteId_key" ON "CargoDetail"("quoteId");

-- CreateIndex
CREATE INDEX "Task_companyId_idx" ON "Task"("companyId");

-- CreateIndex
CREATE INDEX "Task_quoteId_idx" ON "Task"("quoteId");

-- CreateIndex
CREATE INDEX "Task_userId_idx" ON "Task"("userId");

-- CreateIndex
CREATE INDEX "Note_companyId_idx" ON "Note"("companyId");

-- CreateIndex
CREATE INDEX "Note_quoteId_idx" ON "Note"("quoteId");

-- CreateIndex
CREATE INDEX "Note_userId_idx" ON "Note"("userId");

-- CreateIndex
CREATE INDEX "Email_companyId_idx" ON "Email"("companyId");

-- CreateIndex
CREATE INDEX "Email_quoteId_idx" ON "Email"("quoteId");

-- CreateIndex
CREATE INDEX "Email_userId_idx" ON "Email"("userId");

-- AddForeignKey
ALTER TABLE "Stop" ADD CONSTRAINT "Stop_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accessorial" ADD CONSTRAINT "Accessorial_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoDetail" ADD CONSTRAINT "CargoDetail_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;
