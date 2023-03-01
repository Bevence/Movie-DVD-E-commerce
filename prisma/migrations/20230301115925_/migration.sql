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

-- CreateIndex
CREATE UNIQUE INDEX "TitleBasics_tconst_key" ON "TitleBasics"("tconst");

-- AddForeignKey
ALTER TABLE "TitleBasics" ADD CONSTRAINT "TitleBasics_tconst_fkey" FOREIGN KEY ("tconst") REFERENCES "TitleAkas"("titleId") ON DELETE NO ACTION ON UPDATE NO ACTION;
