window.addEventListener("DOMContentLoaded", () => {
  const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userNombre = document.getElementById('userName');
  if (userNombre) {
    userNombre.textContent = user.nombre;
    document.getElementById('editProfile').href='../perfil/perfil.html?from=alumno&id=${user.id}';
  }
});

const coursesAlumno = [
  {id:0, title: 'AAAAAAAHHHHHHHH', description: 'Aprende HTML, CSS, JavaScript y más.', img: "../../resources/cursoWeb.png" },
  {id:1, title: 'Diseño UX/UI', description: 'Crea experiencias digitales efectivas.', img: "../../resources/cursoUXUI.png" },
  {id:2, title: 'Python para Ciencia de Datos', description: 'Analiza datos y crea modelos predictivos con Python.', img: "../../resources/cursoData.jpg" }
];

const coursesTodos = [
  {id:0, title: 'Desarrollo Web', description: 'Aprende HTML, CSS, JavaScript y más.', img: "../../resources/cursoWeb.png" },
  {id:1, title: 'Diseño UX/UI', description: 'Crea experiencias digitales efectivas.', img: "../../resources/cursoUXUI.png" },
  {id:2, title: 'Marketing Digital', description: 'Domina estrategias de marketing online.', img: "../../resources/cursoMarketing.png" },
  {id:3, title: 'Python para Principiantes', description: 'Aprende desde cero practicando.', img: "../../resources/cursoPython.png" },
  {id:4, title: 'Gestión de Proyectos', description: 'Planifica y lidera proyectos con éxito.', img: "../../resources/cursoGestProy.png" },
  {id:5, title: 'Introducción a JavaScript', description: 'Aprende los fundamentos de JavaScript desde cero.', img: "../../resources/cursoJava.jpg" },
  {id:6, title: 'React Avanzado', description: 'Domina React y crea aplicaciones web modernas.', img: "../../resources/cursoReact.jpg" },
  {id:7, title: 'Python para Ciencia de Datos', description: 'Analiza datos y crea modelos predictivos con Python.', img: "../../resources/cursoData.jpg" }
];

let cursos = [];

const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');
const todosCursosContainer = document.getElementById('todosCursos');

document.addEventListener("DOMContentLoaded", () => {
  showCursos(coursesTodos);
  showCursosbyAlumnoTitle(coursesAlumno);
});

function showCursos(courses) {
  let todosCursos = document.getElementById('todosCursos');
  todosCursos.innerHTML = '';
  courses.forEach(course => {
    const col = document.createElement('div');
    col.className = 'card';
    col.innerHTML = `
        <div class="row justify-content-start">
          <div class="col-3">
            <img src=${course.img} class="card-img" alt="Curso">
          </div>
          <div class="col-8">
            <div class="card-body">
              <h5 class="card-title">${course.title}</h5>
              <p class="card-text text-muted"> <b>${course.description}</b> Lorem ipsum dolor sit amet
                consectetur adipiscing, elit fames eros sapien congue aenean, ridiculus nec phasellus lacus etiam.
                Torquent fames suspendisse massa ac fermentum sodales, tristique integer nulla pharetra augue at aenean,
                maecenas luctus purus scelerisque feugiat. Malesuada faucibus fusce sociis class nostra dignissim leo
                facilisis posuere fames, ac semper potenti fringilla turpis elementum vitae gravida aenean, risus justo
                purus erat eget integer suscipit lacinia mollis.</p>
              <a href="../../cursos/curso.html?id=${course.id}&from=alumno" class="btn btn-outline-primary mt-2">Ver curso</a>
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
  todosCursosContainer.innerHTML='';

  const filteredCourses = cursos.filter(course => course.title.toLowerCase().includes(query));

  if (filteredCourses.length === 0) {
    resultsContainer.innerHTML = '<p class="text-center text-muted" style="padding-bottom: 40px;">No se encontraron resultados.</p>';
    return;
  }

  filteredCourses.forEach(course => {
    const col = document.createElement('div');
    col.className = 'card';
    col.innerHTML = `
        <div class="row justify-content-start">
          <div class="col-3">
            <img src=${course.img} class="card-img" alt="Curso">
          </div>
          <div class="col-8">
            <div class="card-body">
              <h5 class="card-title">${course.title}</h5>
              <p class="card-text text-muted"> <b>${course.description}</b> Lorem ipsum dolor sit amet
                consectetur adipiscing, elit fames eros sapien congue aenean, ridiculus nec phasellus lacus etiam.
                Torquent fames suspendisse massa ac fermentum sodales, tristique integer nulla pharetra augue at aenean,
                maecenas luctus purus scelerisque feugiat. Malesuada faucibus fusce sociis class nostra dignissim leo
                facilisis posuere fames, ac semper potenti fringilla turpis elementum vitae gravida aenean, risus justo
                purus erat eget integer suscipit lacinia mollis.</p>
              <a href="../../cursos/curso.html?id=${course.id}&from=alumno" class="btn btn-outline-primary mt-2">Ver curso</a>
            </div>
          </div>
        </div>
        `;
    resultsContainer.appendChild(col);
  });
});

function showCursosbyAlumnoTitle(courses) {
  let cursosAlumno = document.getElementById('cursosAlumno');
  courses.forEach(course => {
    const li = document.createElement('li');
    li.className = 'nav-item';
    li.innerHTML = `
    <a href="../../cursos/curso.html?id=${course.id}&from=alumno" class="nav-link" style="--bs-nav-link-color: #333; --bs-nav-link-hover-color: #333">
    ${course.title}
    </a>`;
    cursosAlumno.appendChild(li);
  })
}

// Interceptar clic en "Mis cursos"
document.getElementById('linkMisCursos')?.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.setItem('selectedCourses', 'alumno'); //esto no esta guardando bien
  showCursos(coursesAlumno);// Guardar selección
  document.getElementById('buscarCursos').innerHTML= 'Buscar Mis Cursos';
  document.getElementById('searchInput').placeholder = "¿Qué deseas seguir aprendiendo?";
  cursos=coursesAlumno;
});

// Si quieres que haya un botón para volver a ver todos los cursos:
document.getElementById('linkTodosCursos')?.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.setItem('selectedCourses', 'todos');
  showCursos(courses);
  document.getElementById('buscarCursos').innerHTML= 'Buscar Cursos';
  document.getElementById('searchInput').placeholder = "¿Qué deseas aprender?";
  cursos=coursesTodos;
});