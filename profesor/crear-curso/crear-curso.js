window.addEventListener("DOMContentLoaded", () => {
  const storedUser = sessionStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userNombre = document.getElementById('userName');
  if (user) {
    userNombre.textContent = user.nombre;
  }
});

document.getElementById('cursoForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const storedUser =  sessionStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  formData.append("profesorId", user.id); 

  try {
    const res = await fetch("http://localhost:3000/curso/new", {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Error al crear el curso");
    } else {
      //alert("Curso creado con éxito!");
      console.log(data);
      location.href = "../dashboard/dashboard.html#scrollMisCursos";
    }
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    alert("Ocurrió un error al crear el curso.");
  }
});
