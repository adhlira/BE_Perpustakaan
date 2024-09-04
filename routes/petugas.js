import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Router } from "express";
import { Permission } from "../authorization.js";
import { authToken, authorizePermission } from "../middleware.js";

const prisma = new PrismaClient();
const router = Router();

router.use(authToken)

router.get("/petugas", authorizePermission(Permission.BROWSE_PETUGAS), async (req, res) => {
  const petugas = await prisma.users.findMany();
  res.status(200).json(petugas);
});

router.get("/petugas/:id",authorizePermission(Permission.BROWSE_PETUGAS), async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "ID tidak di ketahui" });
  } else {
    const petugas = await prisma.users.findFirst({ where: { id: +req.params.id } });
    if (!petugas) {
      res.status(404).json({ message: "Data petugas tidak ditemukan" });
    } else {
      res.status(200).json(petugas);
    }
  }
});

router.post("/register",authorizePermission(Permission.ADD_PETUGAS), async (req, res) => {
  const { role_id, username, password, nama, telp } = req.body;

  if (!role_id || !username || !password || !nama || !telp) {
    res.status(400).json({ message: "Data tidak lengkap" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const users = await prisma.users.create({ data: { role_id, username, password: hashedPassword, nama, telp } });
    res.status(200).json({ message: "Berhasil menambahkan data Users", users });
  }
});

router.put("/petugas/:id", authorizePermission(Permission.UPDATE_PETUGAS), async (req, res) => {
  const { password, ...otherData } = req.body;
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "ID tidak diketahui" });
  } else {
    const petugas = await prisma.users.findFirst({ where: { id: +req.params.id } });
    if (!petugas) {
      res.status(404).json({ message: "Data petugas tidak ditemukan" });
    } else {
      let updatedData = { ...otherData };
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedData.password = hashedPassword;
      }
      const petugas_terbaru = await prisma.users.update({ where: { id: +req.params.id }, data: updatedData });
      res.status(200).json({ message: "Data petugas berhasil di perbarui", petugas_terbaru });
    }
  }
});

router.delete("/petugas/:id", authorizePermission(Permission.DELETE_PETUGAS), async (req, res) => {
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
