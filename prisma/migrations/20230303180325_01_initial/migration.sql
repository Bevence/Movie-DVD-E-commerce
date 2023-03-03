-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "role" "ROLE" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TitleAkas" (
    "titleId" TEXT NOT NULL,
    "ordering" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "region" VARCHAR(255) NOT NULL,
    "language" VARCHAR(255) NOT NULL,
    "types" VARCHAR(255)[],
    "attributes" VARCHAR(255)[],
    "isOriginalTitle" BOOLEAN NOT NULL DEFAULT false,
    "quantityAvailable" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "TitleAkas_pkey" PRIMARY KEY ("titleId")
);

-- CreateTable
CREATE TABLE "NameBasic" (
    "id" TEXT NOT NULL,
    "nconst" TEXT NOT NULL,
    "primaryName" VARCHAR(255) NOT NULL,
    "birthYear" DATE NOT NULL,
    "deathYear" DATE NOT NULL,
    "primaryProfession" VARCHAR(255)[],
    "knownForTitles" VARCHAR(255)[],

    CONSTRAINT "NameBasic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TitleBasic" (
    "id" TEXT NOT NULL,
    "tconst" TEXT NOT NULL,
    "titleType" VARCHAR(255) NOT NULL,
    "primaryTitle" VARCHAR(255) NOT NULL,
    "originalTitle" VARCHAR(255) NOT NULL,
    "isAdult" BOOLEAN NOT NULL DEFAULT false,
    "startYear" DATE,
    "endYear" DATE,
    "runtimeMinutes" INTEGER NOT NULL,
    "genres" VARCHAR(255)[],

    CONSTRAINT "TitleBasic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TitleCrew" (
    "id" TEXT NOT NULL,
    "tconst" TEXT NOT NULL,
    "directors" VARCHAR(255)[],
    "writers" VARCHAR(255)[],

    CONSTRAINT "TitleCrew_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TitleEpisode" (
    "id" TEXT NOT NULL,
    "tconst" TEXT NOT NULL,
    "parentTconst" VARCHAR(255) NOT NULL,
    "seasonNumber" INTEGER NOT NULL,
    "episodeNumber" INTEGER NOT NULL,

    CONSTRAINT "TitleEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TitlePrincipal" (
    "id" TEXT NOT NULL,
    "tconst" TEXT NOT NULL,
    "ordering" SERIAL NOT NULL,
    "nconst" TEXT NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "job" VARCHAR(255) NOT NULL,
    "characters" VARCHAR(255) NOT NULL,

    CONSTRAINT "TitlePrincipal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TitleRating" (
    "id" TEXT NOT NULL,
    "tconst" TEXT NOT NULL,
    "averageRating" DOUBLE PRECISION NOT NULL,
    "numVotes" INTEGER NOT NULL,

    CONSTRAINT "TitleRating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "NameBasic_nconst_key" ON "NameBasic"("nconst");

-- CreateIndex
CREATE UNIQUE INDEX "TitleBasic_tconst_key" ON "TitleBasic"("tconst");

-- CreateIndex
CREATE UNIQUE INDEX "TitleCrew_tconst_key" ON "TitleCrew"("tconst");

-- CreateIndex
CREATE UNIQUE INDEX "TitleEpisode_tconst_key" ON "TitleEpisode"("tconst");

-- CreateIndex
CREATE UNIQUE INDEX "TitlePrincipal_tconst_key" ON "TitlePrincipal"("tconst");

-- CreateIndex
CREATE UNIQUE INDEX "TitlePrincipal_nconst_key" ON "TitlePrincipal"("nconst");

-- CreateIndex
CREATE UNIQUE INDEX "TitleRating_tconst_key" ON "TitleRating"("tconst");

-- AddForeignKey
ALTER TABLE "TitleBasic" ADD CONSTRAINT "TitleBasic_tconst_fkey" FOREIGN KEY ("tconst") REFERENCES "TitleAkas"("titleId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TitleCrew" ADD CONSTRAINT "TitleCrew_tconst_fkey" FOREIGN KEY ("tconst") REFERENCES "TitleAkas"("titleId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TitleEpisode" ADD CONSTRAINT "TitleEpisode_tconst_fkey" FOREIGN KEY ("tconst") REFERENCES "TitleAkas"("titleId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TitlePrincipal" ADD CONSTRAINT "TitlePrincipal_tconst_fkey" FOREIGN KEY ("tconst") REFERENCES "TitleAkas"("titleId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TitlePrincipal" ADD CONSTRAINT "TitlePrincipal_nconst_fkey" FOREIGN KEY ("nconst") REFERENCES "NameBasic"("nconst") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TitleRating" ADD CONSTRAINT "TitleRating_tconst_fkey" FOREIGN KEY ("tconst") REFERENCES "TitleAkas"("titleId") ON DELETE NO ACTION ON UPDATE NO ACTION;
