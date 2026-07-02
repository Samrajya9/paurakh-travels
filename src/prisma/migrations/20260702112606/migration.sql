-- CreateTable
CREATE TABLE `image_attachments` (
    `id` VARCHAR(191) NOT NULL,
    `imageId` VARCHAR(191) NOT NULL,
    `entityType` ENUM('PACKAGE', 'DESTINATION', 'REGION') NOT NULL,
    `entityId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `image_attachments_entityType_entityId_idx`(`entityType`, `entityId`),
    INDEX `image_attachments_imageId_idx`(`imageId`),
    UNIQUE INDEX `image_attachments_imageId_entityType_entityId_key`(`imageId`, `entityType`, `entityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `images` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `alt_text` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `image_attachments` ADD CONSTRAINT `image_attachments_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `images`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
