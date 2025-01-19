/*
  Warnings:

  - Added the required column `type` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "type" TEXT NOT NULL;
