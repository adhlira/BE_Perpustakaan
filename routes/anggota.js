import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();

const router = Router();

router.get("/anggota", async (req, res) => {
  const anggota = await prisma.anggota.findMany();
  res.status(200).json(anggota);
});

router.get("/anggota/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "ID anggota tidak diketahui" });
  } else {
    const anggota = await prisma.anggota.findFirst({ where: { id: +req.params.id } });
    if (!anggota) {
      res.status(404).json({ message: "Data anggota tidak ditemukan" });
    } else {
      res.status(200).json(anggota);
    }
  }
});

router.post("/anggota", async (req, res) => {
  const { nis, nama, jenis_kelamin, telp } = req.body;

  if (!req.body.nis || !req.body.nama || !req.body.jenis_kelamin || !req.body.telp) {
    res.status(400).json({ message: "Data tidak lengkap" });
  } else {
    const petugas = await prisma.anggota.create({ data: { nis, nama, jenis_kelamin, telp } });
    res.status(200).json({ message: "Berhasil menambahkan data petugas", petugas });
  }
});

router.put("/anggota/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "ID tidak diketahui" });
  } else {
    const anggota = await prisma.anggota.findFirst({ where: { id: +req.params.id } });
    if (!anggota) {
      res.status(404).json({ message: "Data anggota tidak ditemukan" });
    } else {
      const anggota_terbaru = await prisma.anggota.update({ where: { id: +req.params.id }, data: req.body });
      res.status(200).json({ message: "Data anggota berhasil di perbarui", anggota_terbaru });
    }
  }
});

router.delete("/anggota/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "ID tidak di ketahui" });
  } else {
    const anggota = await prisma.anggota.findFirst({ where: { id: +req.params.id } });
    if (!anggota) {
      res.status(404).json({ message: "Data anggota tidak di temukan" });
    } else {
      await prisma.anggota.delete({ where: { id: +req.params.id } });
      res.status(200).json({ message: "Data anggota berhasil di hapus" });
    }
  }
});

export default router;
