window.addEventListener("DOMContentLoaded", () => {
  const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
});

function logout() {
  sessionStorage.removeItem('user');
  window.location.href = '../../login/login.html';
}
