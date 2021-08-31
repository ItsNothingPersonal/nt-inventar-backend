-- CreateTable
CREATE TABLE `Gegenstand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `beschreibung` VARCHAR(191),
    `anzahl` INTEGER NOT NULL,
    `bild` VARCHAR(191),
    `istInKisteById` INTEGER NOT NULL,
    `hinzugefuegt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `letzteInventur` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Gegenstand.name_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kiste` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `beschreibung` VARCHAR(191),
    `lagerort` VARCHAR(191) NOT NULL,
    `hinzugefuegt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `letzteInventur` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Kiste.name_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Gegenstand` ADD FOREIGN KEY (`istInKisteById`) REFERENCES `Kiste`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
