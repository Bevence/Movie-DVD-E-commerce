-- DropForeignKey
ALTER TABLE "MovieDirector" DROP CONSTRAINT "MovieDirector_directorId_fkey";

-- DropForeignKey
ALTER TABLE "MovieDirector" DROP CONSTRAINT "MovieDirector_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieWriter" DROP CONSTRAINT "MovieWriter_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieWriter" DROP CONSTRAINT "MovieWriter_writerId_fkey";

-- AddForeignKey
ALTER TABLE "MovieDirector" ADD CONSTRAINT "MovieDirector_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES "NameBasic"("nconst") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieDirector" ADD CONSTRAINT "MovieDirector_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "TitleCrew"("tconst") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieWriter" ADD CONSTRAINT "MovieWriter_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "NameBasic"("nconst") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieWriter" ADD CONSTRAINT "MovieWriter_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "TitleCrew"("tconst") ON DELETE RESTRICT ON UPDATE CASCADE;
