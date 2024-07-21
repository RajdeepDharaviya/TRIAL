/*
  Warnings:

  - Added the required column `orgId` to the `EventManager` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventManager" ADD COLUMN     "orgId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "EventManager" ADD CONSTRAINT "EventManager_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organizer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
