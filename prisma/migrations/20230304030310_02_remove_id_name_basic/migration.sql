/*
  Warnings:

  - The primary key for the `NameBasic` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `NameBasic` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NameBasic" DROP CONSTRAINT "NameBasic_pkey",
DROP COLUMN "id";
