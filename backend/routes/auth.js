const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db');
const SALT_ROUNDS = 10;

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query(
      `SELECT id_admin, username, password, role 
       FROM admin 
       WHERE username = $1 
         AND status = 'aktif'`,
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Username / password salah' });
    }

    const admin = result.rows[0];

    const match = await bcrypt.compare(password, admin.password)

    if (!match) {
      return res.status(401).json({ message: 'Username / password salah' });
    }

    res.json({
      success: true,
      user: {
        id_admin: admin.id_admin,
        username: admin.username,
        role: admin.role
      }
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

    const hashpassword = await bcrypt.hash(password, SALT_ROUNDS)

    await db.query(
      `INSERT INTO admin (username, password, nama_admin)
       VALUES ($1, $2, $3)`,
      [username, hashpassword, nama_admin]
    );

    res.json({ success: true, message: 'Admin berhasil didaftarkan' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
