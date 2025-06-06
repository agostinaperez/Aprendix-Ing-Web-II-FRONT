window.addEventListener("DOMContentLoaded", () => {
  const storedUser = sessionStorage.getItem('user') || localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userNombre = document.getElementById('userName');
  const registerName = document.getElementById('registerName');
  const registerEmail = document.getElementById('registerEmail');
  const registerUsername = document.getElementById('registerUsername');
  const registerPassword = document.getElementById('registerPassword');
  if (user) {
    userNombre.textContent = user.nombre;
    registerEmail.value = user.email;
    registerName.value = user.nombre;
    registerUsername.value = user.usuario;

    if (user.rol === "PROFESOR") {
      document.getElementById("linkTodosCursos").href="../profesor/dashboard/dashboard.html#scrollInicio"
    }
  }
});

function updatePerfil() {
  
}

function logout() {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('misCursos');
  sessionStorage.removeItem('cursos');
  window.location.href = '../login/login.html';
}
