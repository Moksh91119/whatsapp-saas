-- CreateEnum
CREATE TYPE "WhatsAppConnectionStatus" AS ENUM ('DISCONNECTED', 'PENDING', 'CONNECTED', 'FAILED');

-- AlterTable
ALTER TABLE "Business" ALTER COLUMN "trialEndsAt" SET DEFAULT (CURRENT_TIMESTAMP + INTERVAL '7 days');

-- CreateTable
CREATE TABLE "WhatsAppAccount" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "phoneNumberId" TEXT,
    "businessAccountId" TEXT,
    "status" "WhatsAppConnectionStatus" NOT NULL DEFAULT 'DISCONNECTED',
    "connectedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhatsAppAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WhatsAppAccount_businessId_key" ON "WhatsAppAccount"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "WhatsAppAccount_phoneNumberId_key" ON "WhatsAppAccount"("phoneNumberId");

-- AddForeignKey
ALTER TABLE "WhatsAppAccount" ADD CONSTRAINT "WhatsAppAccount_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;
