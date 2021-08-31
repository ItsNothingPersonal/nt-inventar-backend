/*
  Warnings:

  - You are about to alter the column `lagerort` on the `Kiste` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("Kiste_lagerort")`.

*/
-- AlterTable
ALTER TABLE `Kiste` MODIFY `lagerort` ENUM('KUNO', 'PELLERHAUS', 'FUNDUS') NOT NULL;
