-- AlterTable
ALTER TABLE "EventManager" ALTER COLUMN "e_date" SET DEFAULT (NOW() + '30 days'::interval);
