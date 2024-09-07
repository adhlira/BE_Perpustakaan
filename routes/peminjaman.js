import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { Permission } from "../authorization.js";
import { authToken, authorizePermission } from "../middleware.js";

const prisma = new PrismaClient();

const router = Router();

router.use(authToken);

router.get("/peminjaman", authorizePermission(Permission.BROWSE_PEMINJAMAN), async (req, res) => {
  const peminjaman = await prisma.peminjaman.findMany({ include: { Users: { select: { nama: true } }, Anggota: { select: { nama: true, nis: true } }, Detail_Peminjaman: { include: { Buku: { select: { judul: true, isbn: true } } } } } });
  res.status(200).json(peminjaman);
});

router.get("/peminjaman/:id", authorizePermission(Permission.BROWSE_PEMINJAMAN), async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "ID buku tidak diketahui" });
  } else {
    const peminjaman = await prisma.peminjaman.findFirst({
      include: {
        Anggota: { select: { nama: true, nis: true } },
        Users: { select: { nama: true } },
        Detail_Peminjaman: { include: { Buku: { select: { judul: true, isbn: true } } } },
      },
      where: { id: +req.params.id },
    });
    if (!peminjaman) {
      res.status(404).json({ message: "Data peminjaman tidak ditemukan" });
    } else {
      res.status(200).json(peminjaman);
    }
  }
});

router.post("/peminjaman", authorizePermission(Permission.ADD_PEMINJAMAN), async (req, res) => {
  const { anggota_id, user_id, tanggal_pinjam, tanggal_kembali, buku_id } = req.body;

  const tanggalPinjam = new Date(tanggal_pinjam);
  const tanggalKembali = new Date(tanggal_kembali);

  if (!req.body.anggota_id || !req.body.user_id || !req.body.tanggal_pinjam || !req.body.tanggal_kembali || !req.body.buku_id) {
    res.status(400).json({ message: "Data tidak lengkap" });
  } else {
    const peminjaman = await prisma.peminjaman.create({
      data: {
        anggota_id: anggota_id,
        user_id: user_id,
        tanggal_pinjam: tanggalPinjam,
        tanggal_kembali: tanggalKembali,
        Detail_Peminjaman: {
          create: { buku_id },
        },
      },
    });
    res.status(200).json({ message: "Berhasil menambahkan data peminjaman", peminjaman });
  }
});

router.put("/peminjaman/:id", authorizePermission(Permission.EDIT_PEMINJAMAN), async (req, res) => {
  const { anggota_id, user_id, tanggal_pinjam, tanggal_kembali, buku_id } = req.body;
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
          user_id,
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

router.delete("/peminjaman/:id", authorizePermission(Permission.DELETE_PEMINJAMAN), async (req, res) => {
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
