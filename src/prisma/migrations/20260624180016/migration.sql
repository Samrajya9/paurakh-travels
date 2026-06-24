/*
  Warnings:

  - You are about to drop the column `title` on the `packages` table. All the data in the column will be lost.
  - Added the required column `name` to the `packages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `packages` DROP COLUMN `title`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `overview` TEXT NULL;

-- CreateTable
CREATE TABLE `destinations` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `max_altitude` INTEGER NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `itinerary_destinations` (
    `id` VARCHAR(191) NOT NULL,
    `itinerary_id` VARCHAR(191) NOT NULL,
    `destination_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `itinerary_destinations_itinerary_id_destination_id_key`(`itinerary_id`, `destination_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `regions` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `itinerary_destinations` ADD CONSTRAINT `itinerary_destinations_itinerary_id_fkey` FOREIGN KEY (`itinerary_id`) REFERENCES `itineraries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itinerary_destinations` ADD CONSTRAINT `itinerary_destinations_destination_id_fkey` FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
