/*
  Warnings:

  - Added the required column `staffName` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "staffName" TEXT NOT NULL;
