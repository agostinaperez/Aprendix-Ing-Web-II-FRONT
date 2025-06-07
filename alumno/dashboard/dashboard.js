window.addEventListener("DOMContentLoaded", async () => {
  const storedUser = sessionStorage.getItem('user') || localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userNombre = document.getElementById('userName');
  if (user) {
    userNombre.textContent = user.nombre;
    document.getElementById('editProfile').href = '../../perfil/perfil.html?from=alumno&id=${user.id}';
    // Carga los cursos y espera que terminen antes de actualizar vista
    await getAllCursos();
    await getMisCursos(user.id);

    // Ahora muestra lo correcto según vistaActual
    actualizarVistaCursos();
  }
});

function actualizarVistaCursos() {
  const vista = sessionStorage.getItem('vistaActual') || 'todosCursos';
  const allCursos = JSON.parse(sessionStorage.getItem('cursos')) || [];
  const misCursos = JSON.parse(sessionStorage.getItem('misCursos')) || [];

  if (vista === 'misCursos' && misCursos.length > 0) {
    showCursos(misCursos);
    document.getElementById('buscarCursos').innerHTML = 'Buscar Mis Cursos';
    document.getElementById('searchInput').placeholder = "¿Qué deseas seguir aprendiendo?";
  } else {
    showCursos(allCursos);
    document.getElementById('buscarCursos').innerHTML = 'Buscar Cursos';
    document.getElementById('searchInput').placeholder = "¿Qué deseas aprender?";
  }
}

async function getAllCursos() {
  try {
    const res = await fetch("http://localhost:3000/curso/all", {
      method: 'GET',
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Error al obtener los cursos");
    } else {
      console.log(data);
      sessionStorage.setItem('cursos', JSON.stringify(data));
      cursos = data;
      showCursos(data);

    }
  } catch (error) {
    console.error("Error al traer los cursos:", error);
    alert("Ocurrió un error al traer los cursos.");
  }

}

async function getMisCursos(alumnoId) {
  try {
    const res = await fetch(`http://localhost:3000/curso/alumno/${alumnoId}`, {
      method: 'GET',
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Error al obtener los cursos");
    } else {
      console.log(data);
      if (data.length > 0) {
        sessionStorage.setItem('misCursos', JSON.stringify(data));
        showCursos(data);
        showMisCursosSidebar()
      }else{
        todosCursosContainer.innerHTML ='<p class="text-center text-muted" style="padding: 200px;">No se encontraron resultados.</p>';
      }
    }
  } catch (error) {
    console.error("Error al traer los cursos:", error);
  }

}

function showMisCursosSidebar() {
  const misCursos = JSON.parse(sessionStorage.getItem("misCursos"));
  let cursosAlumno = document.getElementById("cursosAlumno");
  if (misCursos) {
    misCursos.forEach((curso) => {
      const li = document.createElement("li");
      li.className = "nav-item";
      li.innerHTML = `
        <a href="../../cursos/curso.html?id=${curso.id}&from=alumno" class="nav-link" style="--bs-nav-link-color: #333; --bs-nav-link-hover-color: #333">
        ${curso.titulo}
        </a>`;
      cursosAlumno.appendChild(li);
    });
  }
}

document.getElementById('logout').addEventListener('click', ()=> {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('misCursos');
  sessionStorage.removeItem('cursos');
  sessionStorage.removeItem('vistaActual');
  window.location.href = "../../login/login.html";
});

let cursos = [];

const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');
const todosCursosContainer = document.getElementById('todosCursos');

function showCursos(cursos) {
  let todosCursos = document.getElementById('todosCursos');
  todosCursos.innerHTML = '';
  cursos.forEach(curso => {
    const col = document.createElement('div');
    col.className = 'card';
    col.innerHTML = `
        <div class="row justify-content-start">
          <div class="col-3">
            <img src="http://localhost:3000${curso.imagen}" class="card-imagen" alt="Curso">
          </div>
          <div class="col-8">
            <div class="card-body">
              <h5 class="card-titulo">${curso.titulo}</h5>
              <p class="card-text text-muted"> <b>${curso.descripcion}</b> Lorem ipsum dolor sit amet
                consectetur adipiscing, elit fames eros sapien congue aenean, ridiculus nec phasellus lacus etiam.
                Torquent fames suspendisse massa ac fermentum sodales, tristique integer nulla pharetra augue at aenean,
                maecenas luctus purus scelerisque feugiat. Malesuada faucibus fusce sociis class nostra dignissim leo
                facilisis posuere fames, ac semper potenti fringilla turpis elementum vitae gravida aenean, risus justo
                purus erat eget integer suscipit lacinia mollis.</p>
              <a href="../../cursos/curso.html?id=${curso.id}&from=alumno" class="btn btn-outline-primary mt-2">Ver curso</a>
            </div>
          </div>
        </div>
        `;
    todosCursos.appendChild(col);
  });
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  resultsContainer.innerHTML = '<p class="text-muted text-center">Resultados de busqueda:</p>';
  todosCursosContainer.innerHTML = '';

  const filteredCursos = cursos.filter(curso => curso.titulo.toLowerCase().includes(query));

  if (filteredCursos.length === 0) {
    resultsContainer.innerHTML = '<p class="text-center text-muted" style="padding-bottom: 200px;">No se encontraron resultados.</p>';
    return;
  }

  filteredCursos.forEach(curso => {
    const col = document.createElement('div');
    col.className = 'card';
    col.innerHTML = `
        <div class="row justify-content-start">
          <div class="col-3">
            <img src=http://localhost:3000${curso.imagen} class="card-imagen" alt="Curso">
          </div>
          <div class="col-8">
            <div class="card-body">
              <h5 class="card-titulo">${curso.titulo}</h5>
              <p class="card-text text-muted"> <b>${curso.descripcion}</b> Lorem ipsum dolor sit amet
                consectetur adipiscing, elit fames eros sapien congue aenean, ridiculus nec phasellus lacus etiam.
                Torquent fames suspendisse massa ac fermentum sodales, tristique integer nulla pharetra augue at aenean,
                maecenas luctus purus scelerisque feugiat. Malesuada faucibus fusce sociis class nostra dignissim leo
                facilisis posuere fames, ac semper potenti fringilla turpis elementum vitae gravida aenean, risus justo
                purus erat eget integer suscipit lacinia mollis.</p>
              <a href="../../cursos/curso.html?id=${curso.id}&from=alumno" class="btn btn-outline-primary mt-2">Ver curso</a>
            </div>
          </div>
        </div>
        `;
    resultsContainer.appendChild(col);
  });
});


// Mostrar mis cursos
document.getElementById('linkMisCursos')?.addEventListener('click', (e) => {
  e.preventDefault();
  const misCursos = JSON.parse(sessionStorage.getItem("misCursos"));
  showCursos(misCursos);
  sessionStorage.setItem('vistaActual', 'misCursos');
  document.getElementById('buscarCursos').innerHTML = 'Buscar Mis Cursos';
  document.getElementById('searchInput').placeholder = "¿Qué deseas seguir aprendiendo?";
});

//Para volver al inicio
document.getElementById('linkTodosCursos')?.addEventListener('click', (e) => {
  e.preventDefault();
  const allCursos = JSON.parse(sessionStorage.getItem('cursos'));
  showCursos(allCursos);
  sessionStorage.setItem('vistaActual', 'todosCursos');
  document.getElementById('buscarCursos').innerHTML = 'Buscar Cursos';
  document.getElementById('searchInput').placeholder = "¿Qué deseas aprender?";
});

document.getElementById('navbar-brand')?.addEventListener('click', (e) => {
  e.preventDefault();
  const allCursos = JSON.parse(sessionStorage.getItem('cursos'));
  showCursos(allCursos);
  sessionStorage.setItem('vistaActual', 'todosCursos');
  document.getElementById('buscarCursos').innerHTML = 'Buscar Cursos';
  document.getElementById('searchInput').placeholder = "¿Qué deseas aprender?";
});