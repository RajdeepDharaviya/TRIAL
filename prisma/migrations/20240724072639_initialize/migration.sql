/*
  Warnings:

  - You are about to alter the column `total_budget` on the `Budget` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Budget" ALTER COLUMN "total_budget" SET DATA TYPE INTEGER;
