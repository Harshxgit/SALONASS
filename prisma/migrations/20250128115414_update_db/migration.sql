/*
  Warnings:

  - Added the required column `Role` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ROLE" ADD VALUE 'ADMIN';
ALTER TYPE "ROLE" ADD VALUE 'STAFF';

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "Role" "ROLE" NOT NULL;
