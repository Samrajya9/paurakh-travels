-- CreateTable
CREATE TABLE `CompanyContact` (
    `id` VARCHAR(191) NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `type` ENUM('PHONE', 'EMAIL', 'WHATSAPP', 'VIBER', 'FACEBOOK', 'INSTAGRAM', 'LINKEDIN', 'YOUTUBE', 'TIKTOK', 'X') NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `CompanyContact_companyId_idx`(`companyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompanyProfile` (
    `id` VARCHAR(191) NOT NULL,
    `singleton` BOOLEAN NOT NULL DEFAULT true,
    `companyName` VARCHAR(191) NOT NULL,
    `tagline` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CompanyProfile_singleton_key`(`singleton`),
    UNIQUE INDEX `CompanyProfile_companyName_key`(`companyName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CompanyContact` ADD CONSTRAINT `CompanyContact_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `CompanyProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
