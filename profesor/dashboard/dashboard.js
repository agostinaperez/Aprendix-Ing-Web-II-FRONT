window.addEventListener("DOMContentLoaded", () => {
  const storedUser = sessionStorage.getItem('user') || localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userNombre = document.getElementById('userName');
  if (user) {
    userNombre.textContent = user.nombre;
    document.getElementById('editProfile').href='../perfil/perfil.html?from=alumno&id=${user.id}';
  }
});

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

document.addEventListener("DOMContentLoaded", () => {
  showCursos(coursesTodos);
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
              <a href="../../cursos/curso.html?id=${course.id}&from=profesor" class="btn btn-outline-primary mt-2">Ver curso</a>
            </div>
          </div>
        </div>
        `;
    todosCursos.appendChild(col);
  });
}