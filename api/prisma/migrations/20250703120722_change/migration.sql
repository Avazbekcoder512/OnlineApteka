/*
  Warnings:

  - Added the required column `locationUrl` to the `Pharmacy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pharmacy" ADD COLUMN     "locationUrl" TEXT NOT NULL;
