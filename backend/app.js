require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getConnection } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/pegawai", async (req, res) => {
  const conn = await getConnection();
  const result = await conn.execute(
    "SELECT id, nama, jabatan, gaji FROM pegawai ORDER BY id",
    [],
    { outFormat: 4002 }
  );
  await conn.close();
  res.json(result.rows);
});

app.post("/pegawai", async (req, res) => {
  const { nama, jabatan, gaji } = req.body;
  const conn = await getConnection();

  await conn.execute(
    `INSERT INTO pegawai (nama, jabatan, gaji)
     VALUES (:nama, :jabatan, :gaji)`,
    { nama, jabatan, gaji },
    { autoCommit: true }
  );

  await conn.close();
  res.json({ message: "OK" });
});

app.delete("/pegawai/:id", async (req, res) => {
  const id = req.params.id;
  const conn = await getConnection();

  await conn.execute(
    "DELETE FROM pegawai WHERE id = :id",
    { id },
    { autoCommit: true }
  );

  await conn.close();
  res.json({ message: "deleted" });
});

app.put("/pegawai/:id", async (req, res) => {
  const { id } = req.params;
  const { nama, jabatan, gaji } = req.body;

  const conn = await getConnection();

  await conn.execute(
    `UPDATE pegawai
     SET nama = :nama,
         jabatan = :jabatan,
         gaji = :gaji
     WHERE id = :id`,
    { id, nama, jabatan, gaji },
    { autoCommit: true }
  );

  await conn.close();
  res.json({ message: "updated" });
});

app.listen(3000, () =>
  console.log("API jalan di http://localhost:3000")
);
