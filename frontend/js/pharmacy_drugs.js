const apiUrl = 'http://localhost:7777/medicines'; // O'zingizning API endpoint

// Dastlab dorilarni yuklaymiz
window.addEventListener('DOMContentLoaded', fetchMedicines);

// 📥 GET all
async function fetchMedicines() {
  const res = await fetch(apiUrl);
  const data = await res.json();
  renderMedicines(data);
}

// 📄 Jadvalga chiqarish
function renderMedicines(meds) {
  const tbody = document.getElementById('medicineBody');
  tbody.innerHTML = '';
  meds.forEach((med, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${med.name?.uz || ''}</td>
      <td><img src="${med.image}" width="50"></td>
      <td>${med.quantity}</td>
      <td>${med.price?.disk || 0} / ${med.price?.box || 0}</td>
      <td>${med.size?.disk || ''} / ${med.size?.box || ''}</td>
      <td>${med.manufacturer}</td>
      <td>
        <button onclick="viewMedicine(${med.id})">👁</button>
        <button onclick="editMedicine(${med.id})">✏️</button>
        <button onclick="deleteMedicine(${med.id})">🗑</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// 👁 GET one (modalda ko'rsatish)
async function viewMedicine(id) {
  const res = await fetch(`${apiUrl}/${id}`);
  const med = await res.json();
  document.getElementById('viewDetails').innerHTML = `
    <strong>Nomi:</strong> ${med.name.uz} / ${med.name.ru} / ${med.name.en}<br>
    <img src="${med.image}" width="100"><br>
    <strong>Soni:</strong> ${med.quantity}<br>
    <strong>Narxi:</strong> Disk: ${med.price.disk}, Quti: ${med.price.box}<br>
    <strong>O'lchami:</strong> Disk: ${med.size.disk}, Quti: ${med.size.box}<br>
    <strong>Ishlab chiqaruvchi:</strong> ${med.manufacturer}
  `;
  openModal('viewModal');
}

// ✏️ Edit — GET one + formga yuklash
async function editMedicine(id) {
  const res = await fetch(`${apiUrl}/${id}`);
  const med = await res.json();

  document.getElementById('modalTitle').innerText = "Dorini tahrirlash";
  document.getElementById('medId').value = med.id;
  document.getElementById('nameUz').value = med.name.uz;
  document.getElementById('nameRu').value = med.name.ru;
  document.getElementById('nameEn').value = med.name.en;
  document.getElementById('quantity').value = med.quantity;
  document.getElementById('priceDisk').value = med.price.disk;
  document.getElementById('priceBox').value = med.price.box;
  document.getElementById('sizeDisk').value = med.size.disk;
  document.getElementById('sizeBox').value = med.size.box;
  document.getElementById('manufacturer').value = med.manufacturer;

  // old image preview
  const imagePreview = document.getElementById('imagePreview');
  imagePreview.src = med.image;
  imagePreview.style.display = 'block';

  openModal('editModal');
}

// 🗑 Delete
async function deleteMedicine(id) {
  if (confirm("Ushbu dorini o'chirmoqchimisiz?")) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    fetchMedicines();
  }
}

// ➕ Yangi dori qo'shish
function openAddModal() {
  document.getElementById('modalTitle').innerText = "Yangi dori qo'shish";
  document.getElementById('medicineForm').reset();
  document.getElementById('medId').value = '';
  document.getElementById('imagePreview').style.display = 'none';
  openModal('editModal');
}

// 📤 Rasm preview
function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.getElementById('imagePreview');
      img.src = e.target.result;
      img.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
}

// 📤 Create / Update
document.getElementById('medicineForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('medId').value;

  const formData = new FormData();
  formData.append('name[uz]', document.getElementById('nameUz').value);
  formData.append('name[ru]', document.getElementById('nameRu').value);
  formData.append('name[en]', document.getElementById('nameEn').value);
  formData.append('image', document.getElementById('imageFile').files[0]);
  formData.append('quantity', document.getElementById('quantity').value);
  formData.append('price[disk]', document.getElementById('priceDisk').value);
  formData.append('price[box]', document.getElementById('priceBox').value);
  formData.append('size[disk]', document.getElementById('sizeDisk').value);
  formData.append('size[box]', document.getElementById('sizeBox').value);
  formData.append('manufacturer', document.getElementById('manufacturer').value);

  const url = id ? `${apiUrl}/${id}` : apiUrl;
  const method = id ? 'PUT' : 'POST';

  await fetch(url, {
    method: method,
    body: formData
  });

  closeModal('editModal');
  fetchMedicines();
});

// 🪟 Modal oynalarni boshqarish
function openModal(id) {
  document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}
