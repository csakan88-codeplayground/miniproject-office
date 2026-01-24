// const user = JSON.parse(localStorage.getItem('user'));

// if (user.role !== 'admin') {
//   alert('Akses ditolak');
//   window.location.href = 'index.html';
// }
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