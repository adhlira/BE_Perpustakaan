import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();

const router = Router();

router.get("/pengembalian", async (req, res) => {
  const pengembalian = await prisma.pengembalian.findMany({
    include: {
      Anggota: { select: { nama: true, nis: true } },
      Users: { select: { nama: true } },
      Peminjaman: { select: { tanggal_pinjam: true } },
    },
  });
  res.status(200).json(pengembalian);
});

router.get("/pengembalian/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "ID buku tidak diketahui" });
  } else {
    const pengembalian = await prisma.pengembalian.findFirst({
      include: {
        Anggota: { select: { nama: true, nis: true } },
        Petugas: { select: { nama: true } },
        Peminjaman: { select: { tanggal_pinjam: true, tanggal_kembali: true } },
        Detail_Pengembalian: { include: { Buku: { select: { judul: true, isbn: true } } } },
      },
      where: { id: +req.params.id },
    });
    if (!pengembalian) {
      res.status(404).json({ message: "Data pengembalian tidak ditemukan" });
    } else {
      res.status(200).json(pengembalian);
    }
  }
});

router.post("/pengembalian", async (req, res) => {
  const { peminjaman_id, anggota_id, petugas_id, tanggal_pengembalian, denda, buku_id } = req.body;

  const tanggalPengembalian = new Date(tanggal_pengembalian);

  const id_peminjaman = await prisma.pengembalian.findFirst({ where: { peminjaman_id: +req.body.peminjaman_id } });

  if (id_peminjaman) {
    res.status(400).json({ message: "Data sudah ada" });
  } else if (!req.body.peminjaman_id || !req.body.anggota_id || !req.body.petugas_id || !req.body.tanggal_pengembalian || !req.body.denda || !req.body.buku_id) {
    res.status(400).json({ message: "Data tidak lengkap" });
  } else {
    const pengembalian = await prisma.pengembalian.create({
      data: {
        peminjaman_id: peminjaman_id,
        anggota_id: anggota_id,
        petugas_id: petugas_id,
        tanggal_pengembalian: tanggalPengembalian,
        denda: denda,
        Detail_Pengembalian: {
          create: { buku_id },
        },
      },
    });
    res.status(200).json({ message: "Berhasil menambahkan data pengembalian", pengembalian });
  }

  // if (!req.body.peminjaman_id || !req.body.anggota_id || !req.body.petugas_id || !req.body.tanggal_pengembalian || !req.body.denda || !req.body.buku_id) {
  //   res.status(400).json({ message: "Data tidak lengkap" });
  // } else {
  //   const pengembalian = await prisma.pengembalian.create({
  //     data: {
  //       peminjaman_id: peminjaman_id,
  //       anggota_id: anggota_id,
  //       petugas_id: petugas_id,
  //       tanggal_pengembalian: tanggalPengembalian,
  //       denda: denda,
  //       Detail_Pengembalian: {
  //         create: { buku_id },
  //       },
  //     },
  //   });
  //   res.status(200).json({ message: "Berhasil menambahkan data pengembalian", pengembalian });
  // }
});

router.put("/peminjaman/:id", async (req, res) => {
  const { anggota_id, petugas_id, tanggal_pinjam, tanggal_kembali, buku_id } = req.body;
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "ID tidak diketahui" });
  } else {
    const peminjaman = await prisma.peminjaman.findFirst({ where: { id: +req.params.id } });
    if (!peminjaman) {
      res.status(404).json({ message: "Data peminjaman tidak ditemukan" });
    } else {
      const peminjaman_terbaru = await prisma.peminjaman.update({
        where: { id: +req.params.id },
        data: {
          anggota_id,
          petugas_id,
          tanggal_pinjam,
          tanggal_kembali,
          Detail_Peminjaman: {
            updateMany: { where: { peminjaman_id: +req.params.id }, data: { buku_id } },
          },
        },
      });
      res.status(200).json({ message: "Data peminjaman berhasil di perbarui", peminjaman_terbaru });
    }
  }
});

router.delete("/peminjaman/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "ID tidak di ketahui" });
  } else {
    const peminjaman = await prisma.peminjaman.findFirst({ where: { id: +req.params.id } });
    if (!peminjaman) {
      res.status(404).json({ message: "Data peminjaman tidak di temukan" });
    } else {
      await prisma.detail_Peminjaman.deleteMany({ where: { peminjaman_id: +req.params.id } });
      await prisma.peminjaman.delete({ where: { id: +req.params.id } });
      res.status(200).json({ message: "Data peminjaman berhasil di hapus" });
    }
  }
});

export default router;
