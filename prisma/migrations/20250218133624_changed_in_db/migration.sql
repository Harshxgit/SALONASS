/*
  Warnings:

  - Added the required column `username` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "orderId" SET DATA TYPE TEXT;
