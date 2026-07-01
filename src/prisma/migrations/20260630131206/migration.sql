/*
  Warnings:

  - You are about to drop the column `overview` on the `packages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `packages` DROP COLUMN `overview`,
    ADD COLUMN `html_overview` TEXT NULL;
