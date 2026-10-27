const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Data rumah sementara
let rumah = [
  {
    id: 1,
    name: "Rumah Minimalis",
    location: "Surakarta",
    price: 650000000,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    description: "Rumah minimalis dengan desain modern",
  },
  {
    id: 2,
    name: "Rumah Keluarga",
    location: "Sukoharjo",
    price: 480000000,
    bedrooms: 2,
    bathrooms: 1,
    area: 90,
    description: "Rumah nyaman untuk keluarga",
  },
  {
    id: 3,
    name: "Rumah Modern",
    location: "Karanganyar",
    price: 890000000,
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    description: "Rumah modern dengan ruangan luas",
  },
];

// Halaman utama
app.get("/", (req, res) => {
  res.json({
    pesan: "API RumahKita berhasil dijalankan",
  });
});

// Menampilkan semua rumah
app.get("/rumah", (req, res) => {
  res.json(rumah);
});

// Menampilkan detail rumah
app.get("/rumah/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const data = rumah.find((item) => item.id === id);

  if (!data) {
    return res.status(404).json({
      pesan: "Rumah tidak ditemukan",
    });
  }

  res.json(data);
});

// Menambahkan rumah
app.post("/rumah", (req, res) => {
  const { name, location, price, bedrooms, bathrooms, area, description } = req.body;

  if (!name || !location || price == null) {
    return res.status(400).json({
      pesan: "Nama, lokasi, dan harga wajib diisi",
    });
  }

  const dataBaru = {
    id: rumah.length ? Math.max(...rumah.map((item) => item.id)) + 1 : 1,
    name,
    location,
    price: Number(price),
    bedrooms: Number(bedrooms) || 0,
    bathrooms: Number(bathrooms) || 0,
    area: Number(area) || 0,
    description: description || "",
  };

  rumah.push(dataBaru);

  res.status(201).json({
    pesan: "Rumah berhasil ditambahkan",
    data: dataBaru,
  });
});

// Mengubah data rumah
app.put("/rumah/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = rumah.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      pesan: "Rumah tidak ditemukan",
    });
  }

  rumah[index] = {
    ...rumah[index],
    ...req.body,
    id,
  };

  res.json({
    pesan: "Data rumah berhasil diperbarui",
    data: rumah[index],
  });
});

// Menghapus rumah
app.delete("/rumah/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = rumah.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      pesan: "Rumah tidak ditemukan",
    });
  }

  const rumahDihapus = rumah.splice(index, 1);

  res.json({
    pesan: "Rumah berhasil dihapus",
    data: rumahDihapus[0],
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API RumahKita berjalan di port ${PORT}`);
});
