async function loadData() {
  const res = await fetch("http://localhost:3000/pegawai");
  const data = await res.json();

  const tbody = document.getElementById("data");
  tbody.innerHTML = "";

  data.forEach((p) => {
    tbody.innerHTML += `
      <tr>
        <td style="display:none">${p.ID}</td>
        <td>${p.NAMA}</td>
        <td>${p.JABATAN}</td>
        <td>${p.GAJI}</td>
        <td>
          <button class="btn btn-sm btn-warning me-1"
            onclick="editPegawai(${p.ID}, '${p.NAMA}', '${p.JABATAN}', ${p.GAJI})">
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
  idPegawai.value = id;
  nama.value = namaVal;
  jabatan.value = jabatanVal;
  gaji.value = gajiVal;

  document.getElementById("btnSimpan").innerText = "Update";
}

loadData();
