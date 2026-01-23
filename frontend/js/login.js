const API_URL = 'http://localhost:3000/api/auth'
document.getElementById('loginForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  console.log(username, password, API_URL);
  if (!username || !password){
    alert('Username dan Password harap diisi');
    return
  }
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Login gagal');
      return;
    }

    // simpan user login
    localStorage.setItem('user', JSON.stringify(data.user));

    // redirect berdasarkan role
    if (data.user.role === 'admin') {
      window.location.href = 'dashboard.html';
    } else {
      window.location.href = 'pegawai.html';
    }

  } catch (err) {
    console.error(err);
    alert('Gagal konek ke server');
  }
});
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('reg_username').value.trim();
  const password = document.getElementById('reg_password').value;
  const nama_admin = document.getElementById('reg_nama').value;

  if (!username || !password || !nama_admin) {
    alert('Semua field wajib diisi');
    return;
  }

  const res = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, nama_admin })
  });

  const data = await res.json();
  if (!res.ok) return alert(data.message);

  alert('Registrasi berhasil, silakan login');
  e.target.reset();
});
