/*
  Warnings:

  - You are about to drop the column `teamId` on the `Note` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_teamId_fkey";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "teamId";

-- CreateTable
CREATE TABLE "_teamNotes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_teamNotes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_teamNotes_B_index" ON "_teamNotes"("B");

-- AddForeignKey
ALTER TABLE "_teamNotes" ADD CONSTRAINT "_teamNotes_A_fkey" FOREIGN KEY ("A") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_teamNotes" ADD CONSTRAINT "_teamNotes_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
