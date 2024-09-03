import express from "express";
import cors from "cors";
import petugasRoute from "./routes/petugas.js";
import loginRoute from "./routes/login.js";
import anggotaRoute from "./routes/anggota.js";
import bukuRoute from "./routes/buku.js";
import pengarangRoute from "./routes/pengarang.js";
import penerbitRoute from "./routes/penerbit.js";
import rakRoute from "./routes/rak.js";
import peminjamanRoute from "./routes/peminjaman.js";
import pengembalianRoute from "./routes/pengembalian.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", true);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  next();
});

app.options("*", cors());
app.use(express.json());
app.use(loginRoute);
app.use(petugasRoute);
app.use(anggotaRoute);
app.use(bukuRoute);
app.use(pengarangRoute);
app.use(penerbitRoute);
app.use(rakRoute);
app.use(peminjamanRoute);
app.use(pengembalianRoute);

export default app;
