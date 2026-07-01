/*
  Warnings:

  - You are about to drop the column `max_altitude` on the `destinations` table. All the data in the column will be lost.
  - Added the required column `elevation` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `itinerary_destinations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `destinations` DROP COLUMN `max_altitude`,
    ADD COLUMN `elevation` INTEGER NOT NULL,
    MODIFY `latitude` DOUBLE NULL,
    MODIFY `longitude` DOUBLE NULL;

-- AlterTable
ALTER TABLE `itinerary_destinations` ADD COLUMN `order` INTEGER NOT NULL;
