-- AlterTable
ALTER TABLE `product` ADD COLUMN `amountAvailable` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `stockUuid` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `ProductsInCart` (
    `uuid` VARCHAR(191) NOT NULL,
    `amountProducts` INTEGER NOT NULL,
    `productUuid` VARCHAR(191) NULL,
    `cartUuid` VARCHAR(191) NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart` (
    `uuid` VARCHAR(191) NOT NULL,
    `userUuid` VARCHAR(191) NULL,
    `totalValue` INTEGER NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductsInCart` ADD CONSTRAINT `ProductsInCart_productUuid_fkey` FOREIGN KEY (`productUuid`) REFERENCES `Product`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductsInCart` ADD CONSTRAINT `ProductsInCart_cartUuid_fkey` FOREIGN KEY (`cartUuid`) REFERENCES `Cart`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userUuid_fkey` FOREIGN KEY (`userUuid`) REFERENCES `User`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;
