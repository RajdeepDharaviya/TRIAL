/*
  Warnings:

  - Added the required column `event_id` to the `Venue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Venue" ADD COLUMN     "event_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "TotalRegisters" (
    "id" SERIAL NOT NULL,
    "even_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "TotalRegisters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "even_id" INTEGER NOT NULL,
    "suggestions" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "EventManager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TotalRegisters" ADD CONSTRAINT "TotalRegisters_even_id_fkey" FOREIGN KEY ("even_id") REFERENCES "EventManager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TotalRegisters" ADD CONSTRAINT "TotalRegisters_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_even_id_fkey" FOREIGN KEY ("even_id") REFERENCES "EventManager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
