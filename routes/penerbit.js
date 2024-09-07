import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { Permission } from "../authorization.js";
import { authToken, authorizePermission } from "../middleware.js";

const prisma = new PrismaClient();

const router = Router();

router.use(authToken);

router.get("/penerbit", authorizePermission(Permission.BROWSE_PENERBIT), async (req, res) => {
  const penerbit = await prisma.penerbit.findMany();
  res.status(200).json(penerbit);
});

router.get("/penerbit/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "ID penerbit tidak diketahui" });
  } else {
    const penerbit = await prisma.penerbit.findFirst({ where: { id: +req.params.id } });
    if (!penerbit) {
      res.status(404).json({ message: "Data penerbit tidak ditemukan" });
    } else {
      res.status(200).json(penerbit);
    }
  }
});

router.post("/penerbit", authorizePermission(Permission.ADD_PENERBIT), async (req, res) => {
  const { nama, alamat } = req.body;

  if (!nama || !alamat) {
    res.status(400).json({ message: "Data tidak lengkap" });
  } else {
    const penerbit = await prisma.penerbit.create({ data: { nama, alamat } });
    res.status(200).json({ message: "Berhasil menambahkan data penerbit", penerbit });
  }
});

router.put("/penerbit/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "ID tidak diketahui" });
  } else {
    const penerbit = await prisma.penerbit.findFirst({ where: { id: +req.params.id } });
    if (!penerbit) {
      res.status(404).json({ message: "Data penerbit tidak ditemukan" });
    } else {
      const penerbit_terbaru = await prisma.penerbit.update({ where: { id: +req.params.id }, data: req.body });
      res.status(200).json({ message: "Data penerbit berhasil di perbarui", penerbit_terbaru });
    }
  }
});

router.delete("/penerbit/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "ID tidak di ketahui" });
  } else {
    const penerbit = await prisma.penerbit.findFirst({ where: { id: +req.params.id } });
    if (!penerbit) {
      res.status(404).json({ message: "Data penerbit tidak di temukan" });
    } else {
      await prisma.penerbit.delete({ where: { id: +req.params.id } });
      res.status(200).json({ message: "Data penerbit berhasil di hapus" });
    }
  }
});

export default router;
