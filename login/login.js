const tabLogin = document.getElementById('tabLogin');
const tabRegister = document.getElementById('tabRegister');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const spinnerOverlay = document.getElementById('spinnerOverlay');
const authImage = document.getElementById('authImage');

window.addEventListener("DOMContentLoaded", () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  if (user) {
    const email = document.getElementById('loginEmail');
    email.value = user.email;
    remember.checked = true;
  }
});

tabLogin.addEventListener('click', () => {
  tabLogin.classList.add('active');
  tabRegister.classList.remove('active');
  loginForm.classList.add('active');
  registerForm.classList.remove('active');

  authImage.src = "../resources/loginImg.jpg";
});

tabRegister.addEventListener('click', () => {
  tabRegister.classList.add('active');
  tabLogin.classList.remove('active');
  registerForm.classList.add('active');
  loginForm.classList.remove('active');

  authImage.src = "../resources/registerImg.jpg";
});

async function auth(event, isRegistro) {
  event.preventDefault();
  spinnerOverlay.classList.remove("d-none");

  try {
    let response;
    let data;

    if (isRegistro) {
      const nombre = document.getElementById('registerName').value;
      const usuario = document.getElementById('registerUsername').value;
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;

      response = await fetch("http://localhost:3000/usuario/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, usuario, password }),
      });

      data = await response.json();

      if (!response.ok) {
        alert(data.error || "Error al registrar usuario");
        spinnerOverlay.classList.add("d-none");
        return;
      }

      console.log("Alumno registrado:", data);
      sessionStorage.setItem('user',  JSON.stringify(data));
      window.location.href = "../alumno/dashboard/dashboard.html";

    } else {
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      const remember = document.getElementById('remember').checked;
      response = await fetch("http://localhost:3000/usuario/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      data = await response.json();

      if (!response.ok) {
        alert(data.error || "Error al iniciar sesión");
        spinnerOverlay.classList.add("d-none");
        return;
      } else {
        const user = data.user;
        console.log("Usuario logueado:", user);

        if (remember) {
          localStorage.setItem('user', JSON.stringify(user));
        }
        sessionStorage.setItem('user',  JSON.stringify(user));

        if (user.rol === "ALUMNO") {
          window.location.href = '../alumno/dashboard/dashboard.html';
        } else if (user.rol === "PROFESOR") {
          window.location.href = '../profesor/dashboard/dashboard.html';
        }
      }
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Ocurrió un error inesperado.");
    spinnerOverlay.classList.add("d-none");
  }
}

document.getElementById("loginFormElement").addEventListener("submit", function (e) {
  auth(e, false);
});

document.getElementById("registerFormElement").addEventListener("submit", function (e) {
  auth(e, true); 
});
