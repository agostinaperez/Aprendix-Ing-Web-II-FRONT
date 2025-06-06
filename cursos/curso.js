/*const cursos = [
    { id: 0, title: 'Desarrollo Web', description: 'Aprende HTML, CSS, JavaScript y más.', img: "../resources/cursoWeb.png" },
    { id: 1, title: 'Diseño UX/UI', description: 'Crea experiencias digitales efectivas.', img: "../resources/cursoUXUI.png" },
    { id: 2, title: 'Marketing Digital', description: 'Domina estrategias de marketing online.', img: "../resources/cursoMarketing.png" },
    { id: 3, title: 'Python para Principiantes', description: 'Aprende desde cero practicando.', img: "../resources/cursoPython.png" },
    { id: 4, title: 'Gestión de Proyectos', description: 'Planifica y lidera proyectos con éxito.', img: "../resources/cursoGestProy.png" },
    { id: 5, title: 'Introducción a JavaScript', description: 'Aprende los fundamentos de JavaScript desde cero.', img: "../resources/cursoJava.jpg" },
    { id: 6, title: 'React Avanzado', description: 'Domina React y crea aplicaciones web modernas.', img: "../resources/cursoReact.jpg" },
    { id: 7, title: 'Python para Ciencia de Datos', description: 'Analiza datos y crea modelos predictivos con Python.', img: "../resources/cursoData.jpg" }
];
const misCursos = [
    {
        id: 0, title: 'Desarrollo Web', description: 'Aprende HTML, CSS, JavaScript y más.', img: "../../resources/cursoWeb.png",
        clases: [
            { id: 0, nombre: 'nose', descripcion: 'algo', vista: false },
            { id: 1, nombre: 'algo', descripcion: 'algonose', vista: false }
        ]
    },
    { id: 1, title: 'Diseño UX/UI', description: 'Crea experiencias digitales efectivas.', img: "../../resources/cursoUXUI.png" },
    { id: 7, title: 'Python para Ciencia de Datos', description: 'Analiza datos y crea modelos predictivos con Python.', img: "../../resources/cursoData.jpg" }
];*/

document.addEventListener("DOMContentLoaded", () => {
  const storedUser = sessionStorage.getItem("user") || localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userNombre = document.getElementById("userName");
  if (user) {
    userNombre.textContent = user.nombre;
    document.getElementById("editProfile").href = "../../perfil/perfil.html?from=alumno&id=${user.id}";
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from");
    adaptnavbar(from);
    const cursoId = parseInt(params.get("id"));
    printcurso(cursoId, from);
  }
});

function adaptnavbar(from) {
  let navbar = document.getElementById("navbar");
  if (from === "index") {
    navbar.className =
      "navbar navbar-expand-lg sticky-top navbar-brand fixed-top align-items-center bg-body-tertiary";
    navbar.innerHTML = `
        <div class="container-fluid">
            <a class="navbar-brand" href="../index.html">
                <img src="../resources/icon.png" alt="Logo" width="35" height="30"
                        class="d-inline-block align-text-top">
                    Aprendix
            </a>
            <div class="navbarNav">
                <div class="navbarNav">
                    <ul class="nav navbar-nav justify-content-end">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="../index.html">Inicio</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="../index.html#scroll1">Cursos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="../index.html#scroll2">Sobre Nosotros</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="../index.html#scroll3">Membresía</a>
                        </li>
                        <a href="login/login.html" class="btn btn-light px-4">Comienza ahora</a>
                        </ul>
                    </div>
                </div>
            </div>`;
    document.getElementById("offcanvasMenu").innerHTML = "";
    document.getElementById("offcanvasMenu").remove();
  } else if (from === "alumno") {
    showMisCursosSidebar();
  } else if (from === "profesor") {
    //profesor
    document.getElementById("icon").href = "../resources/icon-alt.png";
    navbar.className =
      "navbar navbar-expand-lg sticky-top navbar-brand fixed-top align-items-center bg-body-tertiary";
    navbar.innerHTML = `
            <div class="container-fluid">
                <a class="navbar-brand" href="../profesor/dashboard/dashboard#scrollInicio">
                    <img src="../resources/icon-alt.png" alt="Logo" width="35" height="30" class="d-inline-block align-text-top">
                    Aprendix | Profesor
                </a>
                <div class="navbarNav">
                    <div class="navbarNav">
                        <ul class="nav navbar-nav justify-content-end">
                            <li class="nav-item">
                                <a id="linkTodosCursos" class="nav-link" aria-current="page" href="../profesor/dashboard/dashboard#scrollInicio">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a id="linkMisCursos" class="nav-link" href="../profesor/dashboard/dashboard#scrollMisCursos">Mis cursos</a>
                            </li>
                            <li class="nav-item">
                                <a id="editProfile" class="nav-link" title="Editar Perfil" href=""../../perfil/perfil.html">Hola, <span id="userName"></span></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>`;
    document.getElementById("offcanvasMenu").innerHTML = "";
    document.getElementById("offcanvasMenu").remove();
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

function printcurso(id, from) {
  const cursos = JSON.parse(sessionStorage.getItem("cursos"));
  const curso = cursos.find((c) => c.id === id);
  let cursodetalle = document.getElementById("curso-detalle");
  if (!curso) {
    if (id === parseInt(-1)) {
      //todos los cursos
      showCursos(cursos);
    } else {
      cursodetalle.innerHTML =
        '<p class="text-muted text-center" style="margin: 300px 0px 300px 0px;">No se encontro el curso.</p>';
    }
  } else {
    //curso individual
    cursodetalle.innerHTML = `
                    <div id="banner" class="banner" style="background-image: url('http://localhost:3000${curso.imagen}');">
                        <div class="text-center">
                            <h1 class="fw-bolder">${curso.titulo}</h1>
                        </div>
                    </div>
                    <!-- Main Content -->
                    <div class="container py-5">
                        <div class="row">
                            <div class="col-lg-8">
                                <div class="bg-light p-4 rounded">
                                    <h5 class="fw-semibold">Descripción</h5>
                                    <p class="text-muted"><b>${curso.descripcion}</b>Lorem ipsum dolor sit amet
                    consectetur adipiscing, elit fames eros sapien congue aenean, ridiculus nec phasellus lacus etiam.
                    Torquent fames suspendisse massa ac fermentum sodales, tristique integer nulla pharetra augue at aenean,
                    maecenas luctus purus scelerisque feugiat. Malesuada faucibus fusce sociis class nostra dignissim leo
                    facilisis posuere fames, ac semper potenti fringilla turpis elementum vitae gravida aenean, risus justo
                    purus erat eget integer suscipit lacinia mollis.</p><br>
                                    <p class="text-muted"><b>Profesor: ${curso.profesor.nombre}</b></p>
                                    <div id="inscripcion">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
    inscripcion(id, from);
  }
}
function logout() {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem('misCursos');
  sessionStorage.removeItem('cursos');
  window.location.href = "../../login/login.html";
}

async function inscribirAlumno() {
  const storedUser = sessionStorage.getItem("user") || localStorage.getItem("user");
  const alumnoId = JSON.parse(storedUser).id;
  const params = new URLSearchParams(window.location.search);
  const cursoId = parseInt(params.get("id"));
  try {
    const res = await fetch("http://localhost:3000/inscripcion/new", {
      method: "POST",
      headers: { "Content-Type": "application/json",
    },
      body: JSON.stringify({ alumnoId, cursoId }),
    });

    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      alert(data.error || "Error al inscribirse");
    } else {
      console.log(data);
      alert("La inscripción se realizó con éxito!")
      location.reload();
    }
  } catch (error) {
    console.error("Error al inscribirse:", error);
    alert("Ocurrió un error al inscribirse");
  }
}

function inscripcion(id, from) {
  const misCursos = JSON.parse(sessionStorage.getItem("misCursos"));

  inscripcion = document.getElementById("inscripcion");
  if (from === "alumno") {
    const cursoAlumno = misCursos? misCursos.find((c) => c.id === id) : null;
    if (!cursoAlumno) {
      //alumno no inscripto
      inscripcion.innerHTML = `<button class="btn btn-primary w-60 mb-3" onclick="inscribirAlumno()">Inscribirse</button>`;
    } else {
      ul = document.createElement("ul");
      ul.className = "nav nav-tabs";
      ul.id = "clasesTabs";
      /* if (cursoAlumno.clases.length > 0) {
                cursoAlumno.clases.forEach(clase => {
                const li = document.createElement('li');
                li.className = 'nav-item';
                li.innerHTML = `
                    <button class="nav-link btn-tab" data-bs-toggle="tab" data-bs-target="#clase${clase.id}" 
                    type="button" role="tab" aria-selected="true" onclick="clasevista(${id}, ${clase.id})">
                        Clase ${clase.id + 1}
                    </button>`;
                ul.appendChild(li);
            });
            inscripcion.appendChild(ul);
            cursoAlumno.clases.forEach(clase => {
                div = document.createElement('div');
                div.className = "tab-content mt-3"
                div.innerHTML = `
                <div class="tab-pane fade show" id = "clase${clase.id}">
                    <h5>${clase.nombre}</h5>
                    <p>${clase.descripcion}</p>
                    <a href="${clase.archivo}"><b>Material</b></a>
                </div>
                `;
                inscripcion.appendChild(div);
            });*/
    }
  } else if (from === "index") {
    inscripcion.innerHTML =
      '<a href="../login/login.html" class="btn btn-primary w-60 mb-3">Comienza ahora</a>';
  } else if (from === "profesor") {
    //esto no me gusta, no está bien
    const cursoProfesor = misCursos.find((c) => c.id === id);
    if (!cursoProfesor) {
      //profesor no asignado a ese curso
      inscripcion.innerHTML =
        '<p class="text-muted text-center" style="margin: 300px 0px 300px 0px;">No se encontro el curso.</p>';
    } else {
      inscripcion.innerHTML = `
        <div class="row">
            <button type="button" class="btn btn-primary w-60 mb-3" data-bs-toggle="modal" data-bs-target="#modalEdit">Editar Curso</button>
            <button onclick="addClase(${id})" type="button" class="btn btn-primary w-60 mb-3" data-bs-toggle="modal" data-bs-target="#modalClase">Agregar Clase</button>
        </div>
        <div id="modalEdit" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title fs-5" id="modalLabel">Editar Curso</h2>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="titulo" class="form-label">Título del curso</label>
                            <input type="text" class="form-control" id="titulo" name="titulo" placeholder="${cursoProfesor.titulo}">
                        </div>
                        <div class="mb-3">
                            <label for="descripcion" class="form-label">Descripción</label>
                            <textarea class="form-control" id="descripcion" name="descripcion" rows="3" placeholder="${cursoProfesor.descripcion}"></textarea>
                        </div>
                        <div class="mb-3">
                                <label for="categoria" class="form-label">Categoría</label>
                                <select class="form-select" id="categoria" name="categoria" >
                                    <option value="">Seleccionar una categoría</option>
                                    <option value="Programación">Programación</option>
                                    <option value="Matemática">Matemática</option>
                                    <option value="Diseño">Diseño</option>
                                    <option value="Idiomas">Idiomas</option>
                                    <option value="Ciencia de datos">Ciencia de datos</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="imagen" class="form-label">Imagen del curso</label>
                                <input type="file" class="form-control" id="imagen" name="imagen" accept="image/*" placeholder="${cursoProfesor.imagen}">
                            </div>
                    </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-danger w-40" data-bs-dismiss="modal" onclick="deletecurso(${id})">Eliminar curso</button>
                            <button type="button" class="btn btn-outline-primary w-40" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn btn-primary w-40" data-bs-dismiss="modal" onclick="editCurso(${id})">Guardar cambios</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="modalClase" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title fs-5" id="modalLabel">Agregar Clase</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre de la clase</label>
                        <input type="text" class="form-control" id="nombre" name="nombre" required>
                    </div>
                    <div class="mb-3">
                        <label for="descripcion" class="form-label">Descripción</label>
                        <textarea class="form-control" id="descripcion" name="descripcion" rows="3" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="archivo" class="form-label">Archivo de la clase</label>
                        <input type="file" class="form-control" id="archivo" name="archivo" accept="image/*" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-primary w-40" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary w-40" data-bs-dismiss="modal" onclick="addClase(${id})">Guardar cambios</button>
                </div>
            </div>
        </div>
    </div>`;
      ul = document.createElement("ul");
      ul.className = "nav nav-tabs";
      ul.id = "clasesTabs";
      cursoProfesor.clases.forEach((clase) => {
        const li = document.createElement("li");
        li.className = "nav-item";
        li.innerHTML = `
                    <button class="nav-link btn-tab" data-bs-toggle="tab" data-bs-target="#clase${
                      clase.id
                    }" 
                    type="button" role="tab" aria-selected="true" onclick="clasevista(${id}, ${
          clase.id
        })">
                        Clase ${clase.id + 1}
                    </button>`;
        ul.appendChild(li);
      });
      inscripcion.appendChild(ul);
      cursoProfesor.clases.forEach((clase) => {
        div = document.createElement("div");
        div.className = "tab-content mt-3";
        div.innerHTML = `
                <div class="tab-pane fade" id = "clase${clase.id}">
                    <h5>${clase.nombre}</h5>
                    <p>${clase.descripcion}</p>
                    <a href="${clase.archivo}"><b>Material</b></a><br>
                    <button id="delete" class="btn btn-danger w-30" onclick="deleteclase(${clase.id})">Eliminar Clase</button>
                </div>
                `;
        inscripcion.appendChild(div);
      });
    }
  }
}

function showCursos(cursos) {
  let todosCursos = document.getElementById("curso-detalle");
  todosCursos.innerHTML = "";
  cursos.forEach((curso) => {
    const col = document.createElement("div");
    col.className = "card";
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
              <a href="../../cursos/curso.html?id=${curso.id}&from=index" class="btn btn-outline-primary mt-2">Ver curso</a>
            </div>
          </div>
        </div>
        `;
    todosCursos.appendChild(col);
  });
}

function clasevista(idcurso, idclase) {
  cursos[idcurso].clases[idclase].vista = true;
}
function editCurso(idcurso) {
  //ver que se ingresa en los inputs y guardarlo
}
function deleteCurso(idcursor) {}
function addClase(idcurso) {}
function deleteclase(idclase) {}
