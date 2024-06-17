/*
  Warnings:

  - A unique constraint covering the columns `[telp]` on the table `petugas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `anggota` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nis` INTEGER NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `jenis_kelamin` VARCHAR(191) NOT NULL,
    `telp` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `anggota_nis_key`(`nis`),
    UNIQUE INDEX `anggota_telp_key`(`telp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengarang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `telp` INTEGER NOT NULL,

    UNIQUE INDEX `pengarang_telp_key`(`telp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Penerbit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rak` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lokasi` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `buku` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pengarang_id` INTEGER NOT NULL,
    `penerbit_id` INTEGER NOT NULL,
    `rak_id` INTEGER NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `tahun_terbit` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `isbn` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `peminjaman` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `anggota_id` INTEGER NOT NULL,
    `petugas_id` INTEGER NOT NULL,
    `tanggal_pinjam` DATETIME(3) NOT NULL,
    `tanggal_kembali` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detail_peminjaman` (
    `peminjaman_id` INTEGER NOT NULL,
    `buku_id` INTEGER NOT NULL,

    PRIMARY KEY (`peminjaman_id`, `buku_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengembalian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `peminjaman_id` INTEGER NOT NULL,
    `anggota_id` INTEGER NOT NULL,
    `petugas_id` INTEGER NOT NULL,
    `tanggal_pengembalian` DATETIME(3) NOT NULL,
    `denda` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detail_pengembalian` (
    `pengembalian_id` INTEGER NOT NULL,
    `buku_id` INTEGER NOT NULL,

    PRIMARY KEY (`pengembalian_id`, `buku_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `petugas_telp_key` ON `petugas`(`telp`);

-- AddForeignKey
ALTER TABLE `buku` ADD CONSTRAINT `buku_pengarang_id_fkey` FOREIGN KEY (`pengarang_id`) REFERENCES `pengarang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `buku` ADD CONSTRAINT `buku_penerbit_id_fkey` FOREIGN KEY (`penerbit_id`) REFERENCES `Penerbit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `buku` ADD CONSTRAINT `buku_rak_id_fkey` FOREIGN KEY (`rak_id`) REFERENCES `rak`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `peminjaman_anggota_id_fkey` FOREIGN KEY (`anggota_id`) REFERENCES `anggota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `peminjaman_petugas_id_fkey` FOREIGN KEY (`petugas_id`) REFERENCES `petugas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_peminjaman` ADD CONSTRAINT `detail_peminjaman_peminjaman_id_fkey` FOREIGN KEY (`peminjaman_id`) REFERENCES `peminjaman`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_peminjaman` ADD CONSTRAINT `detail_peminjaman_buku_id_fkey` FOREIGN KEY (`buku_id`) REFERENCES `buku`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengembalian` ADD CONSTRAINT `pengembalian_peminjaman_id_fkey` FOREIGN KEY (`peminjaman_id`) REFERENCES `peminjaman`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengembalian` ADD CONSTRAINT `pengembalian_anggota_id_fkey` FOREIGN KEY (`anggota_id`) REFERENCES `anggota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengembalian` ADD CONSTRAINT `pengembalian_petugas_id_fkey` FOREIGN KEY (`petugas_id`) REFERENCES `petugas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_pengembalian` ADD CONSTRAINT `detail_pengembalian_pengembalian_id_fkey` FOREIGN KEY (`pengembalian_id`) REFERENCES `pengembalian`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_pengembalian` ADD CONSTRAINT `detail_pengembalian_buku_id_fkey` FOREIGN KEY (`buku_id`) REFERENCES `buku`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
