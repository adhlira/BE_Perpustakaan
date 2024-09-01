/*
  Warnings:

  - You are about to drop the column `petugas_id` on the `peminjaman` table. All the data in the column will be lost.
  - You are about to drop the column `petugas_id` on the `pengembalian` table. All the data in the column will be lost.
  - You are about to drop the `petugas` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `peminjaman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `pengembalian` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `peminjaman` DROP FOREIGN KEY `peminjaman_petugas_id_fkey`;

-- DropForeignKey
ALTER TABLE `pengembalian` DROP FOREIGN KEY `pengembalian_petugas_id_fkey`;

-- AlterTable
ALTER TABLE `peminjaman` DROP COLUMN `petugas_id`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `pengembalian` DROP COLUMN `petugas_id`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `petugas`;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_id` INTEGER NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `telp` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_telp_key`(`telp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `peminjaman_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengembalian` ADD CONSTRAINT `pengembalian_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
