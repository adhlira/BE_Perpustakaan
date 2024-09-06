import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { authToken, authorizePermission } from "../middleware.js";
import { Permission } from "../authorization.js";

const prisma = new PrismaClient();

const router = Router();

router.use(authToken);

router.get("/buku", authorizePermission(Permission.BROWSE_BUKU), async (req, res) => {
  const buku = await prisma.buku.findMany();
  res.status(200).json(buku);
});

router.get("/buku/:id", authorizePermission(Permission.BROWSE_BUKU), async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "ID buku tidak diketahui" });
  } else {
    const buku = await prisma.buku.findFirst({
      include: {
        Pengarang: { select: { nama: true } },
        Penerbit: { select: { nama: true } },
        Rak: { select: { lokasi: true } },
      },
      where: { id: +req.params.id },
    });
    if (!buku) {
      res.status(404).json({ message: "Data buku tidak ditemukan" });
    } else {
      res.status(200).json(buku);
    }
  }
});

router.post("/buku", authorizePermission(Permission.ADD_BUKU), async (req, res) => {
  const { pengarang_id, penerbit_id, rak_id, judul, tahun_terbit, jumlah, isbn } = req.body;

  if (!req.body.pengarang_id || !req.body.penerbit_id || !req.body.rak_id || !req.body.judul || !req.body.tahun_terbit || !req.body.jumlah || !req.body.isbn) {
    res.status(400).json({ message: "Data tidak lengkap" });
  } else {
    const buku = await prisma.buku.create({ data: { pengarang_id, penerbit_id, rak_id, judul, tahun_terbit, jumlah, isbn } });
    res.status(200).json({ message: "Berhasil menambahkan data buku", buku });
  }
});

router.put("/buku/:id", authorizePermission(Permission.EDIT_BUKU), async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "ID tidak diketahui" });
  } else {
    const buku = await prisma.buku.findFirst({ where: { id: +req.params.id } });
    if (!buku) {
      res.status(404).json({ message: "Data buku tidak ditemukan" });
    } else {
      const buku_terbaru = await prisma.buku.update({ where: { id: +req.params.id }, data: req.body });
      res.status(200).json({ message: "Data buku berhasil di perbarui", buku_terbaru });
    }
  }
});

router.delete("/buku/:id", authorizePermission(Permission.DELETE_BUKU), async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "ID tidak di ketahui" });
  } else {
    const buku = await prisma.buku.findFirst({ where: { id: +req.params.id } });
    if (!buku) {
      res.status(404).json({ message: "Data buku tidak di temukan" });
    } else {
      await prisma.buku.delete({ where: { id: +req.params.id } });
      res.status(200).json({ message: "Data buku berhasil di hapus" });
    }
  }
});

export default router;
