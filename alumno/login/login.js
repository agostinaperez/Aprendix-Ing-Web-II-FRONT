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

    //traer los usuarios. Si ya existe uno con ese mail tirar error
    //si no, hacer un post a la base de datos
      if (existingUsers.length > 0) {
        alert("Ya existe un usuario con ese correo.");
        spinnerOverlay.classList.add("d-none");
        return;
      }

      /*Algo así?
      fetch('http://localhost:3000/alumnos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: name,
          email: email,
          password: password
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log('Alumno creado:', data);
        })
        .catch(error => console.error('Error al crear alumno:', error));
      */

    } else {
  
      // acá hacer un get para buscar el usuario del login, si no existe el usuario tirar error

      if (users.length === 0 || users.contraseña != contraseña) {
        alert("Usuario o contraseña incorrectos.");
        spinnerOverlay.classList.add("d-none");
        return;
      }
    }

    setTimeout(() => {
      window.location.href = '../dashboard/dashboard.html';
    }, 2000);

  } catch (error) {
    console.error("Error:", error);
    alert("Ocurrió un error inesperado.");
    spinnerOverlay.classList.add("d-none");
  }
}