/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `StaffAvailability` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StaffAvailability_date_key" ON "StaffAvailability"("date");
