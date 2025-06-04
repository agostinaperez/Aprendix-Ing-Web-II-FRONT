window.addEventListener("DOMContentLoaded", () => {
  const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userNombre = document.getElementById('userName');
  if (userNombre) {
    userNombre.textContent = user.nombre;
  }
});

function logout() {
  sessionStorage.removeItem('user');
  window.location.href = '../../login/login.html';
}