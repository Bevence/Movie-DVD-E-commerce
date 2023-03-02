/*
  Warnings:

  - You are about to drop the `NameBasics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TitleBasics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TitlePrincipals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TitleRatings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TitleBasics" DROP CONSTRAINT "TitleBasics_tconst_fkey";

-- DropForeignKey
ALTER TABLE "TitlePrincipals" DROP CONSTRAINT "TitlePrincipals_nconst_fkey";

-- DropForeignKey
ALTER TABLE "TitlePrincipals" DROP CONSTRAINT "TitlePrincipals_tconst_fkey";

-- DropForeignKey
ALTER TABLE "TitleRatings" DROP CONSTRAINT "TitleRatings_tconst_fkey";

-- DropTable
DROP TABLE "NameBasics";

-- DropTable
DROP TABLE "TitleBasics";

-- DropTable
DROP TABLE "TitlePrincipals";

-- DropTable
DROP TABLE "TitleRatings";

-- CreateTable
CREATE TABLE "NameBasic" (
    "nconst" TEXT NOT NULL,
    "primaryName" VARCHAR(255) NOT NULL,
    "birthYear" DATE NOT NULL,
    "deathYear" DATE NOT NULL,
    "primaryProfession" VARCHAR(255)[],
    "knownForTitles" VARCHAR(255)[],

    CONSTRAINT "NameBasic_pkey" PRIMARY KEY ("nconst")
);

-- CreateTable
CREATE TABLE "TitleBasic" (
    "tconst" TEXT NOT NULL,
    "titleType" VARCHAR(255) NOT NULL,
    "primaryTitle" VARCHAR(255) NOT NULL,
    "originalTitle" VARCHAR(255) NOT NULL,
    "isAdult" BOOLEAN NOT NULL DEFAULT false,
    "startYear" DATE,
    "endYear" DATE,
    "runtimeMinutes" INTEGER NOT NULL,
    "genres" VARCHAR(255)[],

    CONSTRAINT "TitleBasic_pkey" PRIMARY KEY ("tconst")
);

-- CreateTable
CREATE TABLE "TitlePrincipal" (
    "tconst" TEXT NOT NULL,
    "ordering" SERIAL NOT NULL,
    "nconst" TEXT NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "job" VARCHAR(255) NOT NULL,
    "characters" VARCHAR(255) NOT NULL,

    CONSTRAINT "TitlePrincipal_pkey" PRIMARY KEY ("tconst")
);

-- CreateTable
CREATE TABLE "TitleRating" (
    "tconst" TEXT NOT NULL,
    "averageRating" DOUBLE PRECISION NOT NULL,
    "numVotes" INTEGER NOT NULL,

    CONSTRAINT "TitleRating_pkey" PRIMARY KEY ("tconst")
);

-- CreateIndex
CREATE UNIQUE INDEX "TitleBasic_tconst_key" ON "TitleBasic"("tconst");

-- CreateIndex
CREATE UNIQUE INDEX "TitlePrincipal_tconst_key" ON "TitlePrincipal"("tconst");

-- CreateIndex
CREATE UNIQUE INDEX "TitlePrincipal_nconst_key" ON "TitlePrincipal"("nconst");

-- CreateIndex
CREATE UNIQUE INDEX "TitleRating_tconst_key" ON "TitleRating"("tconst");

-- AddForeignKey
ALTER TABLE "TitleBasic" ADD CONSTRAINT "TitleBasic_tconst_fkey" FOREIGN KEY ("tconst") REFERENCES "TitleAkas"("titleId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TitlePrincipal" ADD CONSTRAINT "TitlePrincipal_tconst_fkey" FOREIGN KEY ("tconst") REFERENCES "TitleAkas"("titleId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TitlePrincipal" ADD CONSTRAINT "TitlePrincipal_nconst_fkey" FOREIGN KEY ("nconst") REFERENCES "NameBasic"("nconst") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TitleRating" ADD CONSTRAINT "TitleRating_tconst_fkey" FOREIGN KEY ("tconst") REFERENCES "TitleAkas"("titleId") ON DELETE NO ACTION ON UPDATE NO ACTION;
