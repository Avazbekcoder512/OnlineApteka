function  fetchPharmacies() {
    fetch('http://localhost:7777/api/pharmacies')
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById('pharmacyList');
            list.innerHTML = ''; 
            data.forEach(ph => {
                list.innerHTML += `
                <tr>
                    <td>${ph.id}</td>
                    <td>${ph.name}</td>
                    <td>${ph.address}</td>
                    <td>${ph.phone}</td>
                    <td>
                    <a href="pharmacy_drugs.html?pharmacyId=${ph.id}"><i class="fa fa-eye"></i></a>
                    <a href="#" onclick='openEditModal(${JSON.stringify(ph)})'><i class="fa fa-pen-to-square"></i></a>
                    <a href="#" onclick='deletePharmacy(${ph.id})'><i class="fa fa-trash-can"></i></a>
                    </td>
                    </tr>
                `;
        });
})
}

function createPharmacy() {
    const name = document.getElementById('newPharmacyName').value;
    const address = document.getElementById('nnewPharmacyAddress').value;
    const phone = document.getElementById('newPharmacyPhone').value;

    fetch('http://localhost:7777/api/pharmacies/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, address, phone })
    })
    .then(res => res.json())
    .then(() => {
        fetchPharmacies();
        document.getElementById("createPharmacyForm").reset();
        $('#createPharmacyModal').modal('hide');
    });
}

function updatePharmacy(e) {
    e.preventDefault();

    const id = document.getElementById('editPharmacyId').value;
    const name = document.getElementById('editPharmacyName').value;
    const address = document.getElementById('editPharmacyAddress').value;
    const phone = document.getElementById('editPharmacyPhone').value;
     $('#editPharmacyModal').modal('show');

    fetch(`http://localhost:7777/api/pharmacies/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, address, phone })
    })
    .then(res => res.json())
    .then(() => {
        fetchPharmacies();
        $('#editPharmacyModal').modal('hide');
    });
}

function deletePharmacy(id) {
    if (confirm("Rostan ham o'chirmoqchimisiz?")) {
        fetch(`http://localhost:7777/api/pharmacies/delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(() => fetchPharmacies());
    }
}

document.addEventListener('DOMContentLoaded', fetchPharmacies)