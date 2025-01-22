/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Packages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Packages_name_key" ON "Packages"("name");
