/*
  Warnings:

  - You are about to drop the column `description` on the `itineraries` table. All the data in the column will be lost.
  - Added the required column `html_description` to the `itineraries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `itineraries` DROP COLUMN `description`,
    ADD COLUMN `distance_km` DOUBLE NULL,
    ADD COLUMN `duration_hours` INTEGER NULL,
    ADD COLUMN `html_description` TEXT NOT NULL;
