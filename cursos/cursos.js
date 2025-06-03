const { createElement } = require("react");

const courses = [
    { id: 0, title: 'Desarrollo Web', description: 'Aprende HTML, CSS, JavaScript y más.', img: "../resources/cursoWeb.png" },
    { id: 1, title: 'Diseño UX/UI', description: 'Crea experiencias digitales efectivas.', img: "../resources/cursoUXUI.png" },
    { id: 2, title: 'Marketing Digital', description: 'Domina estrategias de marketing online.', img: "../resources/cursoMarketing.png" },
    { id: 3, title: 'Python para Principiantes', description: 'Aprende desde cero practicando.', img: "../resources/cursoPython.png" },
    { id: 4, title: 'Gestión de Proyectos', description: 'Planifica y lidera proyectos con éxito.', img: "../resources/cursoGestProy.png" },
    { id: 5, title: 'Introducción a JavaScript', description: 'Aprende los fundamentos de JavaScript desde cero.', img: "../resources/cursoJava.jpg" },
    { id: 6, title: 'React Avanzado', description: 'Domina React y crea aplicaciones web modernas.', img: "../resources/cursoReact.jpg" },
    { id: 7, title: 'Python para Ciencia de Datos', description: 'Analiza datos y crea modelos predictivos con Python.', img: "../resources/cursoData.jpg" }
];
const coursesAlumno = [
    { id: 0, title: 'AAAAAAAHHHHHHHH', description: 'Aprende HTML, CSS, JavaScript y más.', img: "../../resources/cursoWeb.png" },
    { id: 1, title: 'Diseño UX/UI', description: 'Crea experiencias digitales efectivas.', img: "../../resources/cursoUXUI.png" },
    { id: 7, title: 'Python para Ciencia de Datos', description: 'Analiza datos y crea modelos predictivos con Python.', img: "../../resources/cursoData.jpg" }
];

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from");
    adaptnavbar(from);
    const cursoId = parseInt(params.get("id"));
    printcurso(cursoId, from);

})

function adaptnavbar(from) {
    let navbar = document.getElementById("navbar");
    if (from === "index") {
        navbar.className = "navbar navbar-expand-lg sticky-top navbar-brand fixed-top align-items-center bg-body-tertiary";
        navbar.innerHTML = `
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
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
    } else if (from === "alumno") {
        navbar.className = "navbar navbar-expand-lg sticky-top navbar-brand fixed-top align-items-center bg-body-tertiary";
        navbar.innerHTML = `
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src="../resources/icon.png" alt="Logo" width="35" height="30" class="d-inline-block align-text-top">
                    Aprendix
                </a>
                <div class="navbarNav">
                    <div class="navbarNav">
                        <ul class="nav navbar-nav justify-content-end">
                            <li class="nav-item">
                                <a id="linkTodosCursos" class="nav-link" aria-current="page" href="#scrollInicio">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a id="linkMisCursos" class="nav-link" href="#">Mis cursos</a>
                            </li>
                            <li class="nav-item">
                                <a id="editProfile" class="nav-link" title="Editar Perfil" href="../perfil/perfil.html">Hola, <span id="userName"></span></a>
                            </li>
                    <!-- offcanvas con los cursos del usuario -->
                            <button class="btn btn-outline-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu" aria-controls="offcanvasMenu">
                            <span id="icon-menu" class="material-symbols-outlined">menu</span>
                        </ul>
                    </div>
                </div>
            </div>`;
        let offcanvas = document.createElement('div');
        offcanvas.className = "offcanvas offcanvas-end";
        offcanvas.tabIndex = "-1";
        offcanvas.id = "offcanvasMenu";
        // <div class= tabindex="-1" id= aria-labelledby="offcanvasMenuLabel">
        offcanvas.innerHTML = `
            <div class="offcanvas-header">
                <h5 id="offcanvasMenuLabel"><img src="../resources/icon-alt.png" alt="Logo" width="25" height="20"
                        class="d-inline-block align-text-top"> Mis Cursos</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
            </div>
            <div class="offcanvas-body bg-body-tertiary">
                <ul class="nav flex-column">
                    <div id="cursosAlumno">
                    <!-- aca van los cursos a los que esta inscripto el alumno -->
                    </div>
                </ul>
            </div>`;
        body.appendChild(offcanvas);
        showCursosbyAlumnoTitle(coursesAlumno);
    } else { //profesor
        navbar.className = "navbar navbar-expand-lg sticky-top navbar-brand fixed-top align-items-center bg-body-tertiary";
        navbar.innerHTML = `
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src="../resources/icon.png" alt="Logo" width="35" height="30" class="d-inline-block align-text-top">
                    Aprendix
                </a>
                <div class="navbarNav">
                    <div class="navbarNav">
                        <ul class="nav navbar-nav justify-content-end">
                            <li class="nav-item">
                                <a id="linkTodosCursos" class="nav-link" aria-current="page" href="#scrollInicio">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a id="linkMisCursos" class="nav-link" href="#">Mis cursos</a>
                            </li>
                            <li class="nav-item">
                                <a id="editProfile" class="nav-link" title="Editar Perfil" href="../perfil/perfil.html">Hola, <span id="userName"></span></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>`;
    }
}

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

function printcurso(id, from) {
    const curso = courses.find(c => c.id === id);
    let cursodetalle = document.getElementById('curso-detalle');
    if (!curso) {
        cursodetalle.innerHTML = '<p class="text-muted text-center">No se encontro el curso.</p>';
    } else {
        if (id === -1) { //todos los cursos
            div = document.createElement('div');
            div.id = "todosCursos";
            div.className = "container-fluid";
            showCursos(courses);
            cursodetalle.appendChild(div);
        } else { //curso individual
            cursodetalle.innerHTML = `
                    <div id="banner" class="banner" style="background-image: url('${curso.img}');">
                        <div class="text-center">
                            <h1 class="fw-bolder">${curso.title}</h1>
                        </div>
                    </div>
                    <!-- Main Content -->
                    <div class="container py-5">
                        <div class="row">
                            <div class="col-lg-8">
                                <div class="bg-light p-4 rounded">
                                    <h5 class="fw-semibold">Descripción</h5>
                                    <p class="text-muted"><b>${curso.description}</b>Lorem ipsum dolor sit amet
                    consectetur adipiscing, elit fames eros sapien congue aenean, ridiculus nec phasellus lacus etiam.
                    Torquent fames suspendisse massa ac fermentum sodales, tristique integer nulla pharetra augue at aenean,
                    maecenas luctus purus scelerisque feugiat. Malesuada faucibus fusce sociis class nostra dignissim leo
                    facilisis posuere fames, ac semper potenti fringilla turpis elementum vitae gravida aenean, risus justo
                    purus erat eget integer suscipit lacinia mollis.</p>
                                    <div id="inscripcion">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
            inscripcion(id, from);
        }
    }
}


function inscripcion(id, from) {
    inscripcion = document.getElementById('inscripcion')
    if (from === "alumno") {
        if (!coursesAlumno.find(c => c.id === id)) {//alumno no inscripto
            inscripcion.innerHTML = `<button class="btn btn-primary w-60 mb-3">Inscribirse</button>`;
        } else {
            ul = document.createElement('ul');
            ul.className="nav nav-tabs";
            ul.id="clasesTabs";
            // ul.role="tablist";
            coursesAlumno[id].clases.forEach(clase => {
                const li = document.createElement('li');
                li.className='nav-item';
                li.innerHTML = `
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#clase${clase.id+1}" type="button" role="tab" aria-selected="true">
                        Clase ${clase.id+1}
                    </button>`;
                ul.appendChild(li);
            })
            inscripcion.appendChild(ul);
            div = document.createElement('div');
            div.className = "tab-content mt-3";
            div.id = "clasesTabsContent";
            coursesAlumno[id].clases.forEach(clase => {
                const tabpane = createElement('div');
                tabpane.className = "tab-pane fade show active";
                tabpane.id = 'clase${clase.id+1}';
                tabpane.innerHTML = `
                    <h5>${clase.nombre}</h5>
                    <p>${clase.descripcion}</p>
                    <a href="${clase.archivo}"><b>Material</b></a>
                `;
                div.appendChild(tabpane);
            })
            inscripcion.appendChild(div);
        }
    } else if(from === "index"){
        inscripcion.innerHTML = '<a href="../login/login.html" class="btn btn-primary w-60 mb-3">Comienza ahora</a>';
    } else if(from === "profesor"){
        inscripcion.innerHTML = '<a href="../profesor/gestion-cursos/modificar-curso.html" class="btn btn-primary w-60 mb-3">Modificar Curso</a>';
    }
}

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
