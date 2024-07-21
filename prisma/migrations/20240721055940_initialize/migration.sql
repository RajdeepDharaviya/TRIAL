/*
  Warnings:

  - Added the required column `e_fees` to the `EventManager` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventManager" ADD COLUMN     "e_fees" DOUBLE PRECISION NOT NULL;
