/*
  Warnings:

  - You are about to drop the column `expiretAt` on the `tokens` table. All the data in the column will be lost.
  - Added the required column `expiredAt` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tokens` DROP COLUMN `expiretAt`,
    ADD COLUMN `expiredAt` DATETIME(3) NOT NULL;
