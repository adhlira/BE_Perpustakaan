import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { Permission } from "../authorization.js";
import { authToken, authorizePermission } from "../middleware.js";

const prisma = new PrismaClient();

const router = Router();

router.use(authToken);

router.get("/pengarang", authorizePermission(Permission.BROWSE_PENGARANG), async (req, res) => {
  const buku = await prisma.pengarang.findMany();
  res.status(200).json(buku);
});

router.get("/pengarang/:id", authorizePermission(Permission.BROWSE_PENGARANG), async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "ID pengarang tidak diketahui" });
  } else {
    const pengarang = await prisma.pengarang.findFirst({ where: { id: +req.params.id } });
    if (!pengarang) {
      res.status(404).json({ message: "Data pengarang tidak ditemukan" });
    } else {
      res.status(200).json(pengarang);
    }
  }
});

router.post("/pengarang", authorizePermission(Permission.ADD_PENGARANG), async (req, res) => {
  const { nama, telp } = req.body;

  if (!nama || !telp) {
    res.status(400).json({ message: "Data tidak lengkap" });
  } else {
    const pengarang = await prisma.pengarang.create({ data: { nama, telp } });
    res.status(200).json({ message: "Berhasil menambahkan data pengarang", pengarang });
  }
});

router.put("/pengarang/:id", authorizePermission(Permission.EDIT_PENGARANG), async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "ID tidak diketahui" });
  } else {
    const pengarang = await prisma.pengarang.findFirst({ where: { id: +req.params.id } });
    if (!pengarang) {
      res.status(404).json({ message: "Data pengarang tidak ditemukan" });
    } else {
      const pengarang_terbaru = await prisma.pengarang.update({ where: { id: +req.params.id }, data: req.body });
      res.status(200).json({ message: "Data pengarang berhasil di perbarui", pengarang_terbaru });
    }
  }
});

router.delete("/pengarang/:id", authorizePermission(Permission.DELETE_PENGARANG), async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "ID tidak di ketahui" });
  } else {
    const pengarang = await prisma.pengarang.findFirst({ where: { id: +req.params.id } });
    if (!pengarang) {
      res.status(404).json({ message: "Data pengarang tidak di temukan" });
    } else {
      await prisma.pengarang.delete({ where: { id: +req.params.id } });
      res.status(200).json({ message: "Data pengarang berhasil di hapus" });
    }
  }
});

export default router;
