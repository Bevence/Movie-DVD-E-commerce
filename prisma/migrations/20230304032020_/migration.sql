/*
  Warnings:

  - You are about to drop the column `directors` on the `TitleCrew` table. All the data in the column will be lost.
  - You are about to drop the column `writers` on the `TitleCrew` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nconst]` on the table `TitleCrew` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nconst` to the `TitleCrew` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TitleCrew" DROP COLUMN "directors",
DROP COLUMN "writers",
ADD COLUMN     "nconst" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TitleCrew_nconst_key" ON "TitleCrew"("nconst");

-- AddForeignKey
ALTER TABLE "TitleCrew" ADD CONSTRAINT "TitleCrew_nconst_fkey" FOREIGN KEY ("nconst") REFERENCES "NameBasic"("nconst") ON DELETE NO ACTION ON UPDATE NO ACTION;
