import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { Permission } from "../authorization.js";
import { authToken, authorizePermission } from "../middleware.js";

const prisma = new PrismaClient();

const router = Router();

router.use(authToken);

router.get("/anggota", authorizePermission(Permission.BROWSE_ANGGOTA), async (req, res) => {
  const anggota = await prisma.anggota.findMany();
  res.status(200).json(anggota);
});

router.get("/anggota/:id", authorizePermission(Permission.BROWSE_ANGGOTA), async (req, res) => {
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

router.post("/anggota", authorizePermission(Permission.ADD_ANGGOTA), async (req, res) => {
  const { nis, nama, jenis_kelamin, telp } = req.body;

  const anggota = await prisma.anggota.findFirst({ where: { nis: nis } });

  if (anggota) {
    return res.status(400).json({ message: "Nis sudah terdaftar" });
  }

  if (!req.body.nis || !req.body.nama || !req.body.jenis_kelamin || !req.body.telp) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  } else {
    const petugas = await prisma.anggota.create({ data: { nis, nama, jenis_kelamin, telp } });
    return res.status(200).json({ message: "Berhasil menambahkan data petugas", petugas });
  }
});

router.put("/anggota/:id", authorizePermission(Permission.UPDATE_ANGGOTA), async (req, res) => {
  const { nis, nama, jenis_kelamin, telp } = req.body;

  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "ID unknown" });
  } else {
    const anggota = await prisma.anggota.findFirst({ where: { id: +req.params.id } });
    if (!anggota) {
      res.status(404).json({ message: "Data tidak ditemukan" });
    } else {
      const updatedAnggota = await prisma.anggota.update({ where: { id: +req.params.id }, data: { nis, nama, jenis_kelamin, telp } });
      res.status(200).json({ message: "Data berhasil di perbaharui", updatedAnggota });
    }
  }
});

router.delete("/anggota/:id", authorizePermission(Permission.DELETE_ANGGOTA), async (req, res) => {
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
