/*
  Warnings:

  - A unique constraint covering the columns `[staffId,date]` on the table `StaffAvailability` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "StaffAvailability_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "StaffAvailability_staffId_date_key" ON "StaffAvailability"("staffId", "date");
