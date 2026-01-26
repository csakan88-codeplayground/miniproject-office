let table;

$(document).ready(function () {
  table = $('#pegawaiTable').DataTable({
    pageLength: 10,
    lengthChange: false,
    columnDefs: [
      { targets: 0, visible: false } // hide ID
    ],
    language: {
      search: "Cari:",
      zeroRecords: "Data tidak ditemukan",
      info: "Menampilkan _START_ - _END_ dari _TOTAL_ data",
      paginate: {
        next: "›",
        previous: "‹"
      }
    }
  });

  loadData();
  const modalEl = document.getElementById("exampleModal");

  modalEl.addEventListener("hidden.bs.modal", () => {
    clearForm();
  });
});


async function loadData() {
  const res = await fetch("http://localhost:3000/pegawai");
  const data = await res.json();

  table.clear();

  data.forEach((p) => {
    table.row.add([
      p.id, // hidden
      p.nama,
      p.jabatan,
      p.gaji,
      p.divisi,
      `
      <button class="btn btn-sm btn-warning me-1"
        onclick="editPegawai(${p.id}, '${p.nama}', '${p.jabatan}', '${p.gaji}', '${p.divisi}')"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal">
        <i class="fa fa-pencil"></i>
      </button>
      <button class="btn btn-sm btn-danger"
        onclick="deletePegawai(${p.id})">
        <i class="fa fa-trash"></i>
      </button>
      `
    ]);
  });

  table.draw();
}
async function simpan() {
  const id = idPegawai.value;

  const payload = {
    nama: nama.value,
    jabatan: jabatan.value,
    gaji: gaji.value,
    divisi: divisi.value,
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
  divisi.value = "";
  document.getElementById("modalTitle").innerHTML =
    '<i class="fa-solid fa-user-plus me-2"></i>Tambah Pegawai';
  document.getElementById("btnSimpan").innerText = "Simpan";
}

function editPegawai(id, namaVal, jabatanVal, gajiVal, divisiVal) {
  document.getElementById("idPegawai").value = id;
  document.getElementById("nama").value = namaVal;
  document.getElementById("jabatan").value = jabatanVal;
  document.getElementById("gaji").value = gajiVal;
  document.getElementById("divisi").value = divisiVal;

  document.getElementById("modalTitle").innerText = "Edit Pegawai";
  document.getElementById("btnSimpan").innerText = "Update";
}

loadData();

function logout() {
  window.location.href = 'index.html';
}