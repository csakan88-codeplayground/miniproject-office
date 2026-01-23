if (user.role !== 'admin') {
  alert('Akses ditolak');
  window.location.href = 'index.html';
}
function logout() {
  window.location.href = 'index.html';
}