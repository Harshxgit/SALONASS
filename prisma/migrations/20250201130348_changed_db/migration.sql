/*
  Warnings:

  - Added the required column `description` to the `Packages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Packages" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "description" TEXT NOT NULL;
