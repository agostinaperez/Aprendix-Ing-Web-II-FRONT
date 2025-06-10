window.addEventListener("DOMContentLoaded", () => {
  const storedUser = sessionStorage.getItem('user');
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
    registerPassword.value = user.password;

    if (user.rol === "PROFESOR") {
      document.getElementById("linkTodosCursos").href="../profesor/dashboard/dashboard.html#scrollInicio"
      document.getElementById('navbar-brand').href="../profesor/dashboard/dashboard.html#scrollInicio"
      document.getElementById('cancelar').href="../profesor/dashboard/dashboard.html";
      document.getElementById('editProfile').href="../profesor/dashboard/dashboard.html";
    }
  }
});

document.getElementById("formPerfil")?.addEventListener("submit", editPerfil);

async function editPerfil(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const storedUser = sessionStorage.getItem('user');
  const userId = JSON.parse(storedUser).id;

  try {
    const res = await fetch(`http://localhost:3000/usuario/edit/${userId}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Error al editar el perfil");
    } else {
      alert("Perfil editado con éxito");
      sessionStorage.setItem('user', JSON.stringify(data));
      if (JSON.parse(storedUser).rol === "PROFESOR") {
        window.location.href = '../profesor/dashboard/dashboard.html'
      } else {
        window.location.href = '../alumno/dashboard/dashboard.html'
      }
      
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Ocurrió un error en la operación.");
  }
}

function logout() {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('misCursos');
  sessionStorage.removeItem('cursos');
  window.location.href = '../login/login.html';
}
