/*
  Warnings:

  - You are about to drop the column `Role` on the `Staff` table. All the data in the column will be lost.
  - Added the required column `role` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "Role",
ADD COLUMN     "role" "ROLE" NOT NULL;
