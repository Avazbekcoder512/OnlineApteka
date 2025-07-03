document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    const data = {
        phone: phone,
        password: password
    };
    
    fetch('http://localhost:7777/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Xatolik: Kirish muvaffaqiyatsiz bo\'ldi');
        }
        return response.json();
    })
    .then(data => {
       console.log('Muvaffaqiyatli kirish:', data);
        document.cookie = `token=${data.token}; path=/; max-age=86400; secure;`;
        window.location.href = "/admin"
       alert("Muvaffaqiyatli kirish!")
    })
    .catch(error => {
        console.error('Xatolik:', error);                                                                 
        alert('Kirish amalga osmadi. Iltimos, telefon raqami yoki parolni tekshiring.');
    });
});
