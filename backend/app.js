require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/pegawai", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, nama, jabatan, gaji FROM pegawai ORDER BY id",
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/pegawai", async (req, res) => {
  try {
    const { nama, jabatan, gaji } = req.body;

    await db.query(
      `INSERT INTO pegawai (nama, jabatan, gaji)
       VALUES ($1, $2, $3)`,
      [nama, jabatan, gaji]
    );

    res.json({ message: "OK" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/pegawai/:id", async (req, res) => {
  try{
  const id = req.params.id;

  await db.query(
    "DELETE FROM pegawai WHERE id = $1",
    [id]
  );
  res.json({ message: "deleted" });
  }catch(err){
    res.status(500).json({ error: err.message });
  }
});

app.put("/pegawai/:id", async (req, res) => {
  try{
  const { id } = req.params;
  const { nama, jabatan, gaji } = req.body;

  await db.query(
    `UPDATE pegawai
     SET nama = $2,
         jabatan = $3,
         gaji = $4
     WHERE id = $1`,
    [ id, nama, jabatan, gaji ]
  );
  res.json({ message: "updated" });
  }catch(err){
    res.status(500).json({ error: err.message });
  }  
});

app.get("/pegawai/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "SELECT * FROM pegawai WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.listen(3000, () => console.log("API jalan di http://localhost:3000"));