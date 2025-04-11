-- CreateEnum
CREATE TYPE "BulkBookingStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "bulkBookingId" TEXT;

-- CreateTable
CREATE TABLE "BulkBooking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "departure" TIMESTAMP(3) NOT NULL,
    "numberOfBuses" INTEGER NOT NULL,
    "numberOfStudents" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "BulkBookingStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BulkBooking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_bulkBookingId_fkey" FOREIGN KEY ("bulkBookingId") REFERENCES "BulkBooking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BulkBooking" ADD CONSTRAINT "BulkBooking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
