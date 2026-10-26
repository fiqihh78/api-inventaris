const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let barang = [
  {
    id: 1,
    nama: "Laptop",
    kategori: "Elektronik",
    jumlah: 5,
  },
  {
    id: 2,
    nama: "Mouse",
    kategori: "Aksesoris",
    jumlah: 10,
  },
  {
    id: 3,
    nama: "Keyboard",
    kategori: "Aksesoris",
    jumlah: 7,
  },
];

app.get("/", (req, res) => {
  res.json({ pesan: "API Inventaris berhasil dijalankan" });
});

app.get("/barang", (req, res) => {
  res.json(barang);
});

app.get("/barang/:id", (req, res) => {
  const data = barang.find((item) => item.id === Number(req.params.id));

  if (!data) {
    return res.status(404).json({ pesan: "Barang tidak ditemukan" });
  }

  res.json(data);
});

app.post("/barang", (req, res) => {
  const { nama, kategori, jumlah } = req.body;

  if (!nama || !kategori || jumlah == null) {
    return res.status(400).json({
      pesan: "Nama, kategori, dan jumlah wajib diisi",
    });
  }

  const dataBaru = {
    id: barang.length ? Math.max(...barang.map((item) => item.id)) + 1 : 1,
    nama,
    kategori,
    jumlah,
  };

  barang.push(dataBaru);
  res.status(201).json(dataBaru);
});

app.put("/barang/:id", (req, res) => {
  const index = barang.findIndex((item) => item.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ pesan: "Barang tidak ditemukan" });
  }

  barang[index] = {
    id: Number(req.params.id),
    nama: req.body.nama,
    kategori: req.body.kategori,
    jumlah: req.body.jumlah,
  };

  res.json(barang[index]);
});

app.delete("/barang/:id", (req, res) => {
  const index = barang.findIndex((item) => item.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ pesan: "Barang tidak ditemukan" });
  }

  const barangDihapus = barang.splice(index, 1);

  res.json({
    pesan: "Barang berhasil dihapus",
    data: barangDihapus[0],
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API berjalan pada port ${PORT}`);
});
