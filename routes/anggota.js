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
    const anggota_baru = await prisma.anggota.create({ data: { nis, nama, jenis_kelamin, telp } });
    return res.status(200).json({ message: "Berhasil menambahkan data anggota baru", anggota_baru });
  }
});

router.put("/anggota/:id", authorizePermission(Permission.UPDATE_ANGGOTA), async (req, res) => {
  const { nis, nama, jenis_kelamin, telp } = req.body;

  if (isNaN(req.params.id)) {
    return res.status(400).json({ message: "ID unknown" });
  } else {
    const anggota = await prisma.anggota.findFirst({ where: { id: +req.params.id } });
    if (!anggota) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    } else {
      if (nis && nis !== anggota.nis) {
        const duplikatNis = await prisma.anggota.findUnique({ where: { nis } });
        if (duplikatNis) {
          return res.status(400).json({ message: "Nis sudah terdaftar" });
        }
      }
      const updatedAnggota = await prisma.anggota.update({ where: { id: +req.params.id }, data: { nis, nama, jenis_kelamin, telp } });
      return res.status(200).json({ message: "Data berhasil di perbaharui", updatedAnggota });
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

router.get("/borrowing_history/:id", authorizePermission(Permission.BORROWING_HISTORY), async (req, res) => {
  if (isNaN(+req.params.id)) {
    return res.status(400).json({ message: "Anggota tidak di ketahui" });
  }
  const anggota = await prisma.anggota.findUnique({ where: { id: +req.params.id } });
  if (!anggota) {
    return res.status(404).json({ message: "Anggota tidak di temukan" });
  }
  const borrowing_history = await prisma.anggota.findUnique({
    where: { id: +req.params.id },
    include: {
      Peminjaman: {
        include: {
          Detail_Peminjaman: {
            include: {
              Buku: {
                select: {
                  judul: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return res.status(200).json(borrowing_history);
});

export default router;
