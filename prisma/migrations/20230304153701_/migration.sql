/*
  Warnings:

  - You are about to drop the column `nconst` on the `TitleCrew` table. All the data in the column will be lost.
  - Made the column `startYear` on table `TitleBasic` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endYear` on table `TitleBasic` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TitleCrew" DROP CONSTRAINT "TitleCrew_nconst_fkey";

-- DropIndex
DROP INDEX "TitleCrew_nconst_key";

-- AlterTable
ALTER TABLE "NameBasic" ADD CONSTRAINT "NameBasic_pkey" PRIMARY KEY ("nconst");

-- AlterTable
ALTER TABLE "TitleAkas" ALTER COLUMN "ordering" DROP DEFAULT;
DROP SEQUENCE "TitleAkas_ordering_seq";

-- AlterTable
ALTER TABLE "TitleBasic" ALTER COLUMN "startYear" SET NOT NULL,
ALTER COLUMN "endYear" SET NOT NULL;

-- AlterTable
ALTER TABLE "TitleCrew" DROP COLUMN "nconst";

-- CreateTable
CREATE TABLE "MovieDirector" (
    "id" TEXT NOT NULL,
    "directorId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,

    CONSTRAINT "MovieDirector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieWriter" (
    "id" TEXT NOT NULL,
    "writerId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,

    CONSTRAINT "MovieWriter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MovieDirector" ADD CONSTRAINT "MovieDirector_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "NameBasic"("nconst") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieDirector" ADD CONSTRAINT "MovieDirector_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES "TitleCrew"("tconst") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieWriter" ADD CONSTRAINT "MovieWriter_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "NameBasic"("nconst") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieWriter" ADD CONSTRAINT "MovieWriter_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "TitleCrew"("tconst") ON DELETE RESTRICT ON UPDATE CASCADE;
