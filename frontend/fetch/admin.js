// Admins
document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector("table tbody");
    const token = localStorage.getItem('token');

    fetch('http://localhost:7777/api/admins', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        } 
    })
    .then(res => res.json())
    .then(data => {
        tableBody.innerHTML = '';
        data.forEach(admin => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${admin.id}</td>
                <td>${admin.name}</td>
                <td>${admin.phone}</td>
                <td><span class="label gradient-1 btn-rounded">${admin.role}</span></td>
                <td>
                    <span>
                        <a href="#" data-toggle="tooltip" data-placement="top" data-id="${admin.id}" title="Edit">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </a>
                        <a href="#" data-toggle="tooltip" data-placement="top" data-id="${admin.id}" title="Delete">
                            <i class="fa-solid fa-trash-can"></i>
                        </a>
                    </span>
                </td>`;
            tableBody.appendChild(tr);
        });
})
    .catch(error => {
        console.error('Xatolik:', error);
        alert('Adminlar ro\'yxatini olishda xatolik yuz berdi.');
    });
})     

function getCookie(name) {
    const value = document.cookie.match( new RegExp('(^| )' + name + '=([^;]+)'));
    return value ? value[2] : null;
}


// Create Admin
document.getElementById("creteAdminForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("adminName").value
    const phone = document.getElementById("adminPhone").value;
    const password = document.getElementById("adminPassword").value;
    const role = document.getElementById("adminRole").value;
    const token = getCookie("token");

    fetch('http://localhost:7777/api/admins', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, phone, role, password})
    })
    .then(res => {
        if (!res.ok) throw new Error('Xatolik: Admin yaratish muvaffaqiyatsiz bo\'ldi');
        return res.json();
    })
    .then(data => {
        alert('Admin muvaffaqiyatli yaratildi!');
        $('#creteAdminModal').modal('hide');
        location.reload();
    })
    .catch(error => {
        console.error('Xatolik:', error);
        alert('Admin yaratishda xatolik yuz berdi. Iltimos, ma\'lumotlarni tekshiring.');
    });
})

function getCookie(name) {
    const value = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return value ? value[2] : null;
}

// Edit Admin
function openModal(admin) {
    document.getElementById("editAdminId").value = admin.id;
    document.getElementById("editAdminName").value = admin.name;
    document.getElementById("editAdminPhone").value = admin.phone;
    document.getElementById("editAdminRole").value = admin.role;
    
    document.getElementById("editAdminModal").style.display = "block";
}

function closeModal() {
    document.getElementById("editAdminModal").style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("editAdminModal");
    if (event.target == modal) {
        closeModal();
    }
}

document.getElementById("editAdminForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("editAdminId").value;
    const name = document.getElementById("editAdminName").value;
    const phone = document.getElementById("editAdminPhone").value;
    const role = document.getElementById("editAdminRole").value;

    // const token = getCookie("token");

    fetch(`http://localhost:7777/api/admins/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, phone, role })
})
.then(res => res.json())
.then(data => {
    alert('Admin muvaffaqiyatli yangilandi!');
    closeModal();
    location.reload();
})
.catch(err => {
    console.error('Xatolik:', err);
})
})

// Delete Admin
function deleteAdmin(id) {
    if (confirm('Rostdan ham bu adminni o\'chirmoqchimisiz?')) {
        const token = getCookie("token");

        fetch(`http://localhost:7777/api/admins/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            if (responseok) {
                alert('Admin o\'chirildi!');
                location.reload();
            } else {
                alert('Xatolik: Admin o\'chirilmadi!')
            }
        })
        .catch(error => {
            console.error('Xatolik:', error);
            alert('Admin o\'chirishda xatolik yuz berdi.');
        });
    }
}

// logout
function logout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "login.html";
}