const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const formImage = document.getElementById("form-image");
const spinnerOverlay = document.getElementById("spinnerOverlay");

btnLogin.addEventListener("click", () => {
  btnLogin.classList.add("active");
  btnRegister.classList.remove("active");
  loginForm.classList.remove("d-none");
  registerForm.classList.add("d-none");
  formImage.style.backgroundImage = "url('../../resources/loginImg.jpg')";
});

btnRegister.addEventListener("click", () => {
  btnRegister.classList.add("active");
  btnLogin.classList.remove("active");
  loginForm.classList.add("d-none");
  registerForm.classList.remove("d-none");
  formImage.style.backgroundImage = "url('../../resources/registerImg.jpg')";
});

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  showSpinnerAndRedirect(false);
});

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  showSpinnerAndRedirect(true);
});

async function showSpinnerAndRedirect(isRegister) {
  spinnerOverlay.classList.remove("d-none");

  try {
    if (isRegister) {
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
      const username = document.getElementById('registerUsername').value;
      const nombre = document.getElementById('registerNombre').value;

       fetch('http://localhost:3000/usuarios/register', {
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
        }, 2000);

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
        return;
      }

      const user = data.user;

      if (user.rol === "ALUMNO") {
        setTimeout(() => {
          window.location.href = "../alumno/dashboard/dashboard.html";
        }, 2000);
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
