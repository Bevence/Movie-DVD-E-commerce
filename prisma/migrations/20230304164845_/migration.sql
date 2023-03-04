/*
  Warnings:

  - You are about to drop the `MovieDirector` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MovieWriter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MovieDirector" DROP CONSTRAINT "MovieDirector_directorId_fkey";

-- DropForeignKey
ALTER TABLE "MovieDirector" DROP CONSTRAINT "MovieDirector_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieWriter" DROP CONSTRAINT "MovieWriter_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieWriter" DROP CONSTRAINT "MovieWriter_writerId_fkey";

-- DropTable
DROP TABLE "MovieDirector";

-- DropTable
DROP TABLE "MovieWriter";

-- CreateTable
CREATE TABLE "_NameBasicToTitleCrew" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_NameBasicToTitleCrew_AB_unique" ON "_NameBasicToTitleCrew"("A", "B");

-- CreateIndex
CREATE INDEX "_NameBasicToTitleCrew_B_index" ON "_NameBasicToTitleCrew"("B");

-- AddForeignKey
ALTER TABLE "_NameBasicToTitleCrew" ADD CONSTRAINT "_NameBasicToTitleCrew_A_fkey" FOREIGN KEY ("A") REFERENCES "NameBasic"("nconst") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NameBasicToTitleCrew" ADD CONSTRAINT "_NameBasicToTitleCrew_B_fkey" FOREIGN KEY ("B") REFERENCES "TitleCrew"("id") ON DELETE CASCADE ON UPDATE CASCADE;
