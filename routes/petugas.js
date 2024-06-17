import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/petugas", async (req, res) => {
  const petugas = await prisma.petugas.findMany();
  res.status(200).json(petugas);
});

router.get("/petugas/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "ID tidak di ketahui" });
  } else {
    const petugas = await prisma.petugas.findFirst({ where: { id: +req.params.id } });
    if (!petugas) {
      res.status(404).json({ message: "Data petugas tidak ditemukan" });
    } else {
      res.status(200).json(petugas);
    }
  }
});

router.post("/petugas", async (req, res) => {
  const { username, password, nama, telp } = req.body;

  if (!req.body.username || !req.body.password || !req.body.nama || !req.body.telp) {
    res.status(400).json({ message: "Data tidak lengkap" });
  } else {
    const petugas = await prisma.petugas.create({ data: { username, password, nama, telp } });
    res.status(200).json({ message: "Berhasil menambahkan data petugas", petugas });
  }
});

router.put("/petugas/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "ID tidak diketahui" });
  } else {
    const petugas = await prisma.petugas.findFirst({ where: { id: +req.params.id } });
    if (!petugas) {
      res.status(404).json({ message: "Data petugas tidak ditemukan" });
    } else {
      const petugas_terbaru = await prisma.petugas.update({ where: { id: +req.params.id }, data: req.body });
      res.status(200).json({ message: "Data petugas berhasil di perbarui", petugas_terbaru });
    }
  }
});

router.delete("/petugas/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "ID tidak di ketahui" });
  } else {
    const petugas = await prisma.petugas.findFirst({ where: { id: +req.params.id } });
    if (!petugas) {
      res.status(404).json({ message: "Data petugas tidak di temukan" });
    } else {
      await prisma.petugas.delete({ where: { id: +req.params.id } });
      res.status(200).json({ message: "Data petugas berhasil di hapus" });
    }
  }
});

export default router;
