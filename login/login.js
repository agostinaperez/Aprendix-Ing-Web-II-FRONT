const tabLogin = document.getElementById('tabLogin');
const tabRegister = document.getElementById('tabRegister');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const spinnerOverlay = document.getElementById('spinnerOverlay');
const authImage = document.getElementById('authImage');

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

async function showSpinnerAndRedirect(isRegister) {
  spinnerOverlay.classList.remove("d-none");

  try {
    if (isRegister) {
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
      const username = document.getElementById('registerUsername').value;
      const nombre = document.getElementById('registerNombre').value;

      await fetch('http://localhost:3000/usuarios/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre,
          email: email,
          password: password,
          username: username
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log('Alumno creado:', data);
      })
      .catch(error => console.error('Error al crear alumno:', error));

      setTimeout(() => {
        window.location.href = "../alumno/dashboard/dashboard.html";
      }, 20000);

    } else {
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      const response = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error);
        spinnerOverlay.classList.add("d-none");
        return;
      }

      const user = data.user;

      if (user.rol === "ALUMNO") {
        setTimeout(() => {
          window.location.href = "../alumno/dashboard/dashboard.html";
        }, 20000);
      } else if (user.rol === "PROFESOR") {
        setTimeout(() => {
          window.location.href = "../profesor/panel-control/panel-control.html";
        }, 2000);
      }
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Ocurrió un error inesperado.");
    spinnerOverlay.classList.add("d-none");
  }
}
