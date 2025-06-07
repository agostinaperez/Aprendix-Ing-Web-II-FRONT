export function adaptnavbar(from, nombreprofe) {
  let navbar = document.getElementById("navbar");
  if (from === "alumno") {
    showMisCursosSidebar();
  } else if (from === "profesor") {
    //profesor
    document.getElementById("icon").href = "../resources/icon-alt.png";
    navbar.className =
      "navbar navbar-expand-lg sticky-top navbar-brand fixed-top align-items-center bg-body-tertiary";
    navbar.innerHTML = `
            <div class="container-fluid">
                <a class="navbar-brand" href="../profesor/dashboard/dashboard.html#scrollInicio">
                    <img src="../resources/icon-alt.png" alt="Logo" width="35" height="30" class="d-inline-block align-text-top">
                    Aprendix | Profesor
                </a>
                <div class="navbarNav">
                    <div class="navbarNav">
                        <ul class="nav navbar-nav justify-content-end">
                            <li class="nav-item">
                                <a id="linkTodosCursos" class="nav-link" aria-current="page" href="../profesor/dashboard/dashboard.html#scrollInicio">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a id="linkMisCursos" class="nav-link" href="../profesor/dashboard/dashboard.html#scrollMisCursos">Mis cursos</a>
                            </li>
                            <li class="nav-item">
                                <a id="editProfile" class="nav-link" title="Editar Perfil" href="../perfil/perfil.html">Hola, ${nombreprofe}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>`;
    document.getElementById("offcanvasMenu").innerHTML = "";
    document.getElementById("offcanvasMenu").remove();
  } else {
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
                        <a href="../login/login.html" class="btn btn-light px-4">Comienza ahora</a>
                        </ul>
                    </div>
                </div>
            </div>`;
    document.getElementById("offcanvasMenu").innerHTML = "";
    document.getElementById("offcanvasMenu").remove();
  }
}

export function showMisCursosSidebar() {
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
export function logoutNavbar() {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("misCursos");
  sessionStorage.removeItem("cursos");
  window.location.href = "../../login/login.html";
}