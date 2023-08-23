/*
  Warnings:

  - You are about to drop the column `buildById` on the `house` table. All the data in the column will be lost.
  - Added the required column `builtById` to the `House` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `house` DROP FOREIGN KEY `House_buildById_fkey`;

-- AlterTable
ALTER TABLE `house` DROP COLUMN `buildById`,
    ADD COLUMN `builtById` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `House` ADD CONSTRAINT `House_builtById_fkey` FOREIGN KEY (`builtById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
