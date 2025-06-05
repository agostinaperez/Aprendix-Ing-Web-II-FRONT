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
  }
});

function logout() {
  sessionStorage.removeItem('user');
  window.location.href = '../../login/login.html';
}