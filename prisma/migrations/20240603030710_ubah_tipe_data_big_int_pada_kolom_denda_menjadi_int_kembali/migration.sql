/*
  Warnings:

  - You are about to alter the column `denda` on the `pengembalian` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `pengembalian` MODIFY `denda` INTEGER NOT NULL;
