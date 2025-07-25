document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    const data = {
      phone: phone,
      password: password,
    };

    fetch("http://localhost:7777/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: 'include',
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Xatolik: Kirish muvaffaqiyatsiz bo'ldi");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Muvaffaqiyatli kirish:", data);
        localStorage.setItem("token", data.token);
        window.location.href = "/frontend/admins.html";
        alert("Muvaffaqiyatli kirish!");
      })
      .catch((error) => {
        console.error("Xatolik:", error);
        alert(
          "Kirish amalga osmadi. Iltimos, telefon raqami yoki parolni tekshiring."
        );
      });
  });
