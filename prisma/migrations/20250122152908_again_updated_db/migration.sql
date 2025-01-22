/*
  Warnings:

  - You are about to drop the column `packageID` on the `Services` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_packageID_fkey";

-- AlterTable
ALTER TABLE "Services" DROP COLUMN "packageID";

-- CreateTable
CREATE TABLE "_PackagesToServices" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PackagesToServices_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PackagesToServices_B_index" ON "_PackagesToServices"("B");

-- AddForeignKey
ALTER TABLE "_PackagesToServices" ADD CONSTRAINT "_PackagesToServices_A_fkey" FOREIGN KEY ("A") REFERENCES "Packages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PackagesToServices" ADD CONSTRAINT "_PackagesToServices_B_fkey" FOREIGN KEY ("B") REFERENCES "Services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
