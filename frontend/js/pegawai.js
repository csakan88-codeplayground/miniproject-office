async function loadData() {
  const res = await fetch("http://localhost:3000/pegawai");
  const data = await res.json();

  const tbody = document.getElementById("data");
  tbody.innerHTML = "";

  data.forEach((p) => {
    tbody.innerHTML += `
      <tr>
        <td style="display:none">${p.id}</td>
        <td>${p.nama}</td>
        <td>${p.jabatan}</td>
        <td>${p.gaji}</td>
        <td>
          <button class="btn btn-sm btn-warning me-1"
            onclick="editPegawai(${p.id}, '${p.nama}', '${p.jabatan}', ${p.gaji})"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal">
            <i class="fa fa-pencil"></i>
          </button>
          <button class="btn btn-sm btn-danger"
            onclick="deletePegawai(${p.ID})">
            <i class="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
}

async function simpan() {
  const id = idPegawai.value;

  const payload = {
    nama: nama.value,
    jabatan: jabatan.value,
    gaji: gaji.value,
  };
  if (id) {
    await fetch(`http://localhost:3000/pegawai/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } else {
    await fetch("http://localhost:3000/pegawai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  clearForm();
  loadData();

  const modalEl = document.getElementById("exampleModal");
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.hide();
}
async function deletePegawai(id) {
  if (!confirm("Yakin mau hapus data ini?")) return;

  await fetch(`http://localhost:3000/pegawai/${id}`, {
    method: "DELETE",
  });

  loadData();
}

function clearForm() {
  idPegawai.value = "";
  nama.value = "";
  jabatan.value = "";
  gaji.value = "";
  document.getElementById("btnSimpan").innerText = "Simpan";
}

function editPegawai(id, namaVal, jabatanVal, gajiVal) {
  document.getElementById("idPegawai").value = id;
  document.getElementById("nama").value = namaVal;
  document.getElementById("jabatan").value = jabatanVal;
  document.getElementById("gaji").value = gajiVal;

  document.getElementById("modalTitle").innerText = "Edit Pegawai";
  document.getElementById("btnSimpan").innerText = "Update";
}

loadData();

function logout() {
  window.location.href = 'index.html';
}