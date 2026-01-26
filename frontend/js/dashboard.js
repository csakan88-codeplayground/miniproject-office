if (window.user.role !== 'admin') {
  alert('Akses ditolak');
  window.history.back();
}
async function loadData() {
  const res = await fetch("http://localhost:3000/jumlahpegawai");
  const data = await res.json()
  document.getElementById('totalPegawai').textContent = data.totalPegawai;
  document.getElementById('totalJabatan').textContent = data.totalPegawai;
  document.getElementById('totalGaji').textContent = data.totalGaji;
}

loadData();

function logout() {
  window.location.href = 'index.html';
}