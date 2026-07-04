/*
  Warnings:

  - Added the required column `difficulty_id` to the `packages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `packages` ADD COLUMN `description` VARCHAR(300) NULL,
    ADD COLUMN `difficulty_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `difficulties` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `difficulties_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `packages` ADD CONSTRAINT `packages_difficulty_id_fkey` FOREIGN KEY (`difficulty_id`) REFERENCES `difficulties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
