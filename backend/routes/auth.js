const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query(
      `SELECT id_admin, username, role 
       FROM admin 
       WHERE username = $1 
         AND password = $2
         AND status = 'aktif'`,
      [username, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Username / password salah' });
    }

    res.json({
      success: true,
      user: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/register', async (req, res) => {
  const { username, password, nama_admin } = req.body;

  try {
    // cek username
    const cek = await db.query(
      'SELECT 1 FROM admin WHERE username = $1',
      [username]
    );

    if (cek.rows.length > 0) {
      return res.status(400).json({ message: 'Username sudah dipakai' });
    }

    await db.query(
      `INSERT INTO admin (username, password, nama_admin)
       VALUES ($1, $2, $3)`,
      [username, password, nama_admin]
    );

    res.json({ success: true, message: 'Admin berhasil didaftarkan' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
