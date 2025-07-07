document.addEventListener("DOMContentLoaded", () => {
  loadPharmacies();
  loadMedicines();
  bindCreateForm();
  bindEditForm();
});

// 1. Load Pharmacies
function loadPharmacies() {
  const pharmacySelect = document.getElementById("pharmacySelect");
  const token = localStorage.getItem("token");

  if (!pharmacySelect) return;

  fetch("http://localhost:7777/pharmacies", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data.pharmacies)) throw new Error("Noto‘g‘ri javob");

      data.pharmacies.forEach(pharmacy => {
        const option = document.createElement("option");
        option.value = pharmacy.id;
        option.textContent = pharmacy.name;
        pharmacySelect.appendChild(option);
      });
    })
    .catch(err => {
      console.error("Dorixonalarni olishda xatolik:", err);
      alert("Dorixonalarni yuklashda xatolik yuz berdi.");
    });
}

// 2. Load Medicines
function loadMedicines() {
  const tableBody = document.querySelector("table tbody");
  const token = localStorage.getItem("token");

  fetch("http://localhost:7777/medicines", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data.medicines)) throw new Error("Noto‘g‘ri format");

      tableBody.innerHTML = "";
      data.medicines.forEach((med, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${med.name.uz}</td>
          <td><img src="${med.image}" width="50" /></td>
          <td>${med.quantity}</td>
          <td>${med.price.disk} / ${med.price.box}</td>
          <td>${med.size.disk} / ${med.size.box}</td>
          <td>${med.manufacturer}</td>
          <td>
            <a href="#" onclick="openEditModal(this)" 
              data-id="${med.id}" 
              data-nameuz="${med.name.uz}" 
              data-nameru="${med.name.ru}" 
              data-nameen="${med.name.en}"
              data-quantity="${med.quantity}" 
              data-pricedisk="${med.price.disk}" 
              data-pricebox="${med.price.box}" 
              data-sizedisk="${med.size.disk}" 
              data-sizebox="${med.size.box}" 
              data-manufacturer="${med.manufacturer}"
              data-image="${med.image}">
              <i class="fa-solid fa-pen-to-square"></i>
            </a>
            <a href="#" onclick="deleteMedicine(${med.id})">
              <i class="fa-solid fa-trash-can"></i>
            </a>
          </td>
        `;
        tableBody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error("Dori yuklashda xatolik:", err);
      alert("Dorilarni yuklashda xatolik yuz berdi.");
    });
}

// 3. Create Medicine
function bindCreateForm() {
  const form = document.getElementById("createMedicineForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token topilmadi. Iltimos, tizimga qayta kiring.");
      return;
    }

    const imageInput = document.getElementById("imageFile");
    if (!imageInput || !imageInput.files.length) {
      alert("Iltimos, rasm faylini tanlang.");
      return;
    }

    const pharmacyId = document.getElementById("pharmacySelect").value;
    if (!pharmacyId) {
      alert("Iltimos, dorixonani tanlang.");
      return;
    }

    const formData = new FormData();
    formData.append("uz_name", document.getElementById("nameUz").value.trim());
    formData.append("ru_name", document.getElementById("nameRu").value.trim());
    formData.append("en_name", document.getElementById("nameEn").value.trim());
    formData.append("warehouse", document.getElementById("quantity").value);
    formData.append("one_plate_price", document.getElementById("priceDisk").value);
    formData.append("one_box_price", document.getElementById("priceBox").value);
    formData.append("one_plate", document.getElementById("sizeDisk").value);
    formData.append("one_box", document.getElementById("sizeBox").value);
    formData.append("made", document.getElementById("manufacturer").value.trim());
    formData.append("pharmacyId", pharmacyId); // string ko‘rinishida

    formData.append("image", imageInput.files[0]);

    fetch("http://localhost:7777/medicine/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            throw new Error(err.error || "Serverdan nomalum xatolik.");
          });
        }
        return res.json();
      })
      .then(() => {
        alert("Dori muvaffaqiyatli qo‘shildi!");
        $("#createMedicineModal").modal("hide");
        form.reset(); // formani tozalash
        location.reload(); // sahifani yangilash
      })
      .catch(err => {
        console.error("Xatolik:", err);
        alert("Xatolik: " + err.message);
      });
  });
}



// 4. Edit Modal
function openEditModal(el) {
  document.getElementById("editId").value = el.dataset.id;
  document.getElementById("editNameUz").value = el.dataset.nameuz;
  document.getElementById("editNameRu").value = el.dataset.nameru;
  document.getElementById("editNameEn").value = el.dataset.nameen;
  document.getElementById("editQuantity").value = el.dataset.quantity;
  document.getElementById("editPriceDisk").value = el.dataset.pricedisk;
  document.getElementById("editPriceBox").value = el.dataset.pricebox;
  document.getElementById("editSizeDisk").value = el.dataset.sizedisk;
  document.getElementById("editSizeBox").value = el.dataset.sizebox;
  document.getElementById("editManufacturer").value = el.dataset.manufacturer;
  document.getElementById("editImageUrl").value = el.dataset.image;

  document.getElementById("editMedicineModal").style.display = "block";
}

function closeEditModal() {
  document.getElementById("editMedicineModal").style.display = "none";
}

window.onclick = function (e) {
  const modal = document.getElementById("editMedicineModal");
  if (e.target === modal) closeEditModal();
};

// 5. Update Medicine
function bindEditForm() {
  const form = document.getElementById("editMedicineForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("editId").value;
    const token = localStorage.getItem("token");

    const updated = {
      name: {
        uz: document.getElementById("editNameUz").value,
        ru: document.getElementById("editNameRu").value,
        en: document.getElementById("editNameEn").value,
      },
      quantity: +document.getElementById("editQuantity").value,
      price: {
        disk: +document.getElementById("editPriceDisk").value,
        box: +document.getElementById("editPriceBox").value,
      },
      size: {
        disk: document.getElementById("editSizeDisk").value,
        box: document.getElementById("editSizeBox").value,
      },
      manufacturer: document.getElementById("editManufacturer").value,
      image: document.getElementById("editImageUrl").value,
    };

    fetch(`http://localhost:7777/medicine/${id}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updated),
    })
      .then(res => {
        if (!res.ok) throw new Error("Yangilashda xatolik.");
        return res.json();
      })
      .then(() => {
        alert("Dori muvaffaqiyatli yangilandi!");
        closeEditModal();
        location.reload();
      })
      .catch(err => {
        console.error("Xatolik:", err);
        alert("Yangilashda muammo yuz berdi.");
      });
  });
}

// 6. Delete Medicine
function deleteMedicine(id) {
  Swal.fire({
    title: "Ishonchingiz komilmi?",
    text: "Ushbu dori o‘chirib yuboriladi!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ha, o‘chir!",
  }).then(result => {
    if (result.isConfirmed) {
      const token = localStorage.getItem("token");

      fetch(`http://localhost:7777/medicine/${id}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          if (!res.ok) throw new Error("O‘chirishda xatolik.");
          return res.json();
        })
        .then(() => {
          Swal.fire("O‘chirildi!", "Dori muvaffaqiyatli o‘chirildi.", "success").then(() =>
            location.reload()
          );
        })
        .catch(err => {
          console.error("Xatolik:", err);
          Swal.fire("Xatolik", "O‘chirishda muammo yuz berdi.", "error");
        });
    }
  });
}
