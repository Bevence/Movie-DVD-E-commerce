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

    CONSTRAINT "TitleAkas_pkey" PRIMARY KEY ("titleId")
);

-- CreateTable
CREATE TABLE "NameBasics" (
    "nconst" TEXT NOT NULL,
    "primaryName" VARCHAR(255) NOT NULL,
    "birthYear" DATE NOT NULL,
    "deathYear" DATE NOT NULL,
    "primaryProfession" VARCHAR(255)[],
    "knownForTitles" VARCHAR(255)[],

    CONSTRAINT "NameBasics_pkey" PRIMARY KEY ("nconst")
);

-- CreateTable
CREATE TABLE "TitleBasics" (
    "tconst" TEXT NOT NULL,
    "titleType" VARCHAR(255) NOT NULL,
    "primaryTitle" VARCHAR(255) NOT NULL,
    "originalTitle" VARCHAR(255) NOT NULL,
    "isAdult" BOOLEAN NOT NULL DEFAULT false,
    "startYear" DATE,
    "endYear" DATE,
    "runtimeMinutes" INTEGER NOT NULL,
    "genres" VARCHAR(255)[],

    CONSTRAINT "TitleBasics_pkey" PRIMARY KEY ("tconst")
);

-- CreateTable
CREATE TABLE "TitleCrew" (
    "tconst" TEXT NOT NULL,
    "directors" VARCHAR(255)[],
    "writers" VARCHAR(255)[],

    CONSTRAINT "TitleCrew_pkey" PRIMARY KEY ("tconst")
);

-- CreateTable
CREATE TABLE "TitleEpisode" (
    "tconst" TEXT NOT NULL,
    "parentTconst" VARCHAR(255) NOT NULL,
    "seasonNumber" INTEGER NOT NULL,
    "episodeNumber" INTEGER NOT NULL,

    CONSTRAINT "TitleEpisode_pkey" PRIMARY KEY ("tconst")
);

-- CreateTable
CREATE TABLE "TitlePrincipals" (
    "tconst" TEXT NOT NULL,
    "ordering" SERIAL NOT NULL,
    "nconst" TEXT NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "job" VARCHAR(255) NOT NULL,
    "characters" VARCHAR(255) NOT NULL,

    CONSTRAINT "TitlePrincipals_pkey" PRIMARY KEY ("tconst")
);

-- CreateTable
CREATE TABLE "TitleRatings" (
    "tconst" TEXT NOT NULL,
    "averageRating" DOUBLE PRECISION NOT NULL,
    "numVotes" INTEGER NOT NULL,

    CONSTRAINT "TitleRatings_pkey" PRIMARY KEY ("tconst")
);

-- CreateIndex
CREATE UNIQUE INDEX "TitleBasics_tconst_key" ON "TitleBasics"("tconst");

-- CreateIndex
CREATE UNIQUE INDEX "TitleCrew_tconst_key" ON "TitleCrew"("tconst");

-- CreateIndex
CREATE UNIQUE INDEX "TitleEpisode_tconst_key" ON "TitleEpisode"("tconst");

-- CreateIndex
CREATE UNIQUE INDEX "TitlePrincipals_tconst_key" ON "TitlePrincipals"("tconst");

-- CreateIndex
CREATE UNIQUE INDEX "TitlePrincipals_nconst_key" ON "TitlePrincipals"("nconst");

-- CreateIndex
CREATE UNIQUE INDEX "TitleRatings_tconst_key" ON "TitleRatings"("tconst");

-- AddForeignKey
ALTER TABLE "TitleBasics" ADD CONSTRAINT "TitleBasics_tconst_fkey" FOREIGN KEY ("tconst") REFERENCES "TitleAkas"("titleId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TitleCrew" ADD CONSTRAINT "TitleCrew_tconst_fkey" FOREIGN KEY ("tconst") REFERENCES "TitleAkas"("titleId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TitleEpisode" ADD CONSTRAINT "TitleEpisode_tconst_fkey" FOREIGN KEY ("tconst") REFERENCES "TitleAkas"("titleId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TitlePrincipals" ADD CONSTRAINT "TitlePrincipals_tconst_fkey" FOREIGN KEY ("tconst") REFERENCES "TitleAkas"("titleId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TitlePrincipals" ADD CONSTRAINT "TitlePrincipals_nconst_fkey" FOREIGN KEY ("nconst") REFERENCES "NameBasics"("nconst") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TitleRatings" ADD CONSTRAINT "TitleRatings_tconst_fkey" FOREIGN KEY ("tconst") REFERENCES "TitleAkas"("titleId") ON DELETE NO ACTION ON UPDATE NO ACTION;
