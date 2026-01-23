const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
  window.location.href = 'index.html';
} else {
  const roleMap = {
    admin: 'Admin',
    pegawai: 'Pegawai',
    superadmin: 'Super Admin',
    hr: 'HR',
    manager: 'Manager'
  };

  document.getElementById('userRole').textContent =
    roleMap[user.role] || user.role;
}
console.log(user)

if (user.role !== 'admin') {
  alert('Akses ditolak');
  window.location.href = 'index.html';
}
function logout() {
  window.location.href = 'index.html';
}