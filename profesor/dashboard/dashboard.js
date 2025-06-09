window.addEventListener("DOMContentLoaded", () => {
  const storedUser = sessionStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userNombre = document.getElementById('userName');
  if (user) {
    userNombre.textContent = user.nombre;
    document.getElementById('editProfile').href='../../perfil/perfil.html?from=alumno&id=${user.id}';
    getCursosProfesor(user.id);
  }
});

async function getCursosProfesor(profesorId) { 
  try {
    const res = await fetch(`http://localhost:3000/curso/profesor/${profesorId}`, {
      method: 'GET',
    });
    
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Error al obtener los cursos");
    } else {
      console.log(data);
      if (data.length > 0) {
        const cantCursos = document.getElementById("cantCursos");
        cantCursos.innerHTML = data.length;
        sessionStorage.setItem('cursos', JSON.stringify(data));
        countAlumnosInscritos(profesorId);
        showCursos(data);
      } 
    }
  } catch (error) {
    console.error("Error al traer los cursos:", error);
  }

}

async function countAlumnosInscritos(profesorId) {
  try {
    const res = await fetch(`http://localhost:3000/inscripcion/alumnos-inscritos/${profesorId}`, {
      method: 'GET',
    });
    
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Error al obtener los cursos");
    } else {
        const cantAlumnos = document.getElementById("cantAlumnos");
        cantAlumnos.innerHTML = JSON.parse(data);
    }
  } catch (error) {
    console.error("Error al traer los cursos:", error);
  }
}

function showCursos(cursos) {
  let todosCursos = document.getElementById('todosCursos');
  todosCursos.innerHTML = '';
  cursos.forEach(curso => {
    const col = document.createElement('div');
    col.className = 'card';
    col.innerHTML = `
        <div class="row justify-content-start">
          <div class="col-3">
            <img src="http://localhost:3000${curso.imagen}" class="card-img" alt="Curso">
          </div>
          <div class="col-8">
            <div class="card-body">
              <h5 class="card-title">${curso.titulo}</h5>
              <p class="card-text text-muted"> <b>${curso.descripcion}</b> Lorem ipsum dolor sit amet
                consectetur adipiscing, elit fames eros sapien congue aenean, ridiculus nec phasellus lacus etiam.
                Torquent fames suspendisse massa ac fermentum sodales, tristique integer nulla pharetra augue at aenean,
                maecenas luctus purus scelerisque feugiat. Malesuada faucibus fusce sociis class nostra dignissim leo
                facilisis posuere fames, ac semper potenti fringilla turpis elementum vitae gravida aenean, risus justo
                purus erat eget integer suscipit lacinia mollis.</p>
              <a href="../../cursos/curso.html?id=${curso.id}&from=profesor" class="btn btn-outline-primary mt-2">Ver curso</a>
            </div>
          </div>
        </div>
        `;
    todosCursos.appendChild(col);
  });
}