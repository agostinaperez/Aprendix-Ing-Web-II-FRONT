import { adaptnavbar, logoutNavbar } from "../navbar/navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  const storedUser =
    sessionStorage.getItem("user") || localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userNombre = document.getElementById("userName");
  if (user) {
    userNombre.textContent = user.nombre;
    document.getElementById("editProfile").href =
      "../../perfil/perfil.html?from=alumno&id=${user.id}";
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from");
    adaptnavbar(from, user.nombre);
    const cursoId = parseInt(params.get("id"));
    printcurso(cursoId, from);
    if (user.rol === "ALUMNO") {
      inscripcion(cursoId, from);
    } else {
      getClasesProfesor(cursoId);
    }
  }
});

function printcurso(id, from) {
  const cursos = JSON.parse(sessionStorage.getItem("cursos"));
  const curso = cursos.find((c) => c.id === id);
  let cursodetalle = document.getElementById("curso-detalle");
  if (!curso) {
      cursodetalle.innerHTML =
        '<p class="text-muted text-center" style="margin: 300px 0px 300px 0px;">No se encontro el curso.</p>';
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
  }
}

let logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", logout);

function logout() {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("misCursos");
  sessionStorage.removeItem("cursos");
  window.location.href = "../../login/login.html";
}
//alumno
async function inscribirAlumno() {
  const storedUser =
    sessionStorage.getItem("user") || localStorage.getItem("user");
  const alumnoId = JSON.parse(storedUser).id;
  const params = new URLSearchParams(window.location.search);
  const cursoId = parseInt(params.get("id"));
  try {
    const res = await fetch("http://localhost:3000/inscripcion/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alumnoId, cursoId }),
    });

    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      alert(data.error || "Error al inscribirse");
    } else {
      console.log(data);
      alert("La inscripción se realizó con éxito!");

      // inscripcion = document.getElementById("inscripcion");
      // inscripcion.innerHTML = "";
      // getClasesAlumno(cursoId);
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
    const cursoAlumno = misCursos ? misCursos.find((c) => c.id === id) : null;
    if (!cursoAlumno) {
      const boton = document.createElement("button");
        boton.className = "btn btn-primary w-60 mb-3";
        boton.textContent = "Inscribirse";
        boton.id = "btnInscribirse";
        boton.addEventListener("click", inscribirAlumno);
        inscripcion.appendChild(boton);
    } else {
      getClasesAlumno(cursoAlumno.id);
    }
  } else if (from === "index") {
    inscripcion.innerHTML =
      '<a href="../login/login.html" class="btn btn-primary w-60 mb-3">Comienza ahora</a>';
  }
}

//alumno
function clasevista(idcurso, idclase) {
  cursos[idcurso].clases[idclase].vista = true;
}
//alumno
async function getClasesAlumno(cursoId) {
  inscripcion = document.getElementById("inscripcion");
  const storedUser =
    sessionStorage.getItem("user") || localStorage.getItem("user");
  const alumnoId = JSON.parse(storedUser).id;
  try {
    const res = await fetch(`http://localhost:3000/clase/${cursoId}/${alumnoId}`, {
      method: 'GET',
    });
    
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Error al obtener las clases");
    } else {
      console.log(data);
      if (data.length > 0) {
      let ul = document.createElement("ul");
      ul.className = "nav nav-tabs";
      ul.id = "clasesTabs";
        data.forEach(clase => {
                const li = document.createElement('li');
                li.className = 'nav-item';
                li.innerHTML = `
                    <button class="nav-link btn-tab" data-bs-toggle="tab" data-bs-target="#clase${clase.id}" 
                    type="button" role="tab" aria-selected="true">
                        Clase ${clase.id }
                    </button>`;
                ul.appendChild(li);
            });
            inscripcion.appendChild(ul);
            data.forEach(clase => {
                let div = document.createElement('div');
                div.className = "tab-content mt-3"
                div.innerHTML = `
                <div class="tab-pane fade show" id = "clase${clase.id}">
                    <h5>${clase.nombre}</h5>
                    <p>${clase.descripcion}</p>
                    <a href="http://localhost:3000${clase.archivo}"><b>Material</b></a>
                </div>
                `;
                inscripcion.appendChild(div);
            });
      } 
    }
  } catch (error) {
    console.error("Error al traer los cursos:", error);
  }
}
//FUNCIONES DE CURSO (PROFESOR) -----------------------------------------------------------------------------------
function getClasesProfesor(id) {
  inscripcion = document.getElementById("inscripcion");
  const cursos = JSON.parse(sessionStorage.getItem("cursos"));
  const curso = cursos.find((c) => c.id === id);
  inscripcion.innerHTML = `
        <div class="row">
            <button type="button" class="btn btn-primary w-60 mb-3" data-bs-toggle="modal" data-bs-target="#modalEdit">Editar Curso</button>
            <button id="addClase" type="button" class="btn btn-primary w-60 mb-3" data-bs-toggle="modal" data-bs-target="#modalClase">Agregar Clase</button>
        </div>
        <div id="modalEdit" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title fs-5" id="modalLabel">Editar Curso</h2>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formEditarCurso" enctype="multipart/form-data">
                      <div class="modal-body">
                          <div class="mb-3">
                              <label for="titulo" class="form-label">Título del curso</label>
                              <input type="text" class="form-control" id="titulo" name="titulo" value="${curso.titulo}">
                          </div>
                          <div class="mb-3">
                              <label for="descripcion" class="form-label">Descripción</label>
                              <textarea class="form-control" id="descripcion" name="descripcion" rows="3">${curso.descripcion}</textarea>
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
                                  <input type="file" class="form-control" id="imagen" name="imagen">
                              </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" id="deleteButton" class="btn btn-danger w-40" data-bs-dismiss="modal" name="action" value="eliminar">Eliminar curso</button>
                            <button type="button" class="btn btn-outline-primary w-40" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn btn-primary w-40" data-bs-dismiss="modal" name="action" value="guardar">Guardar cambios</button>
                        </div>
                    </form>
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
                <form id="formAgregarClase">
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
                      <button type="submit" class="btn btn-primary w-40" data-bs-dismiss="modal">Guardar cambios</button>
                  </div>
                </form>  
            </div>
        </div>
    </div>`;
  document.getElementById("formAgregarClase")?.addEventListener("submit", addClase);
  document.getElementById("formEditarCurso")?.addEventListener("submit", editCurso);
    document.getElementById("deleteButton")?.addEventListener("click", deleteCurso);

  let ul = document.createElement("ul");
  ul.className = "nav nav-tabs";
  ul.id = "clasesTabs";
  if (curso.clases.length > 0) {
    curso.clases.forEach((clase) => {
      const li = document.createElement("li");
      li.className = "nav-item";
      li.innerHTML = `
                      <button class="nav-link btn-tab" data-bs-toggle="tab" data-bs-target="#clase${clase.id}" 
                      type="button" role="tab" aria-selected="true">
                          Clase ${clase.id}
                      </button>`;
      ul.appendChild(li);
    });
    inscripcion.appendChild(ul);
    curso.clases.forEach((clase) => {
      let div = document.createElement("div");
      div.className = "tab-content mt-3";
      div.innerHTML = `
                  <div class="tab-pane fade" id = "clase${clase.id}">
                      <h5>${clase.nombre}</h5>
                      <p>${clase.descripcion}</p>
                      <a href="${clase.archivo}"><b>Material</b></a><br>
                      <button id="delete" class="btn btn-danger w-30">Eliminar Clase</button>
                  </div>
                  `;
      inscripcion.appendChild(div);
      document.getElementById("delete").addEventListener("click", () => {
        deleteClase(clase.id)
      });
    });
  }
}
//no sé como diferenciar entre el botón de eliminar y el botón de
async function editCurso(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const params = new URLSearchParams(window.location.search);
  const cursoId = parseInt(params.get("id"));

  try {
      const res = await fetch(`http://localhost:3000/curso/edit/${cursoId}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Error al editar el curso");
      } else {
        alert("Curso editado con éxito");
        window.location.href = '../profesor/dashboard/dashboard.html'
      }
    } catch (error) {
    console.error("Error:", error);
    alert("Ocurrió un error en la operación.");
  }
}

async function deleteCurso() {
  try {
      const params = new URLSearchParams(window.location.search);
      const cursoId = parseInt(params.get("id"));
      const confirmacion = confirm("¿Estás seguro de eliminar este curso?");
        if (!confirmacion) return;

        const res = await fetch(`http://localhost:3000/curso/delete/${cursoId}`, {
          method: "DELETE",
        });

        const data = await res.json();
        if (!res.ok) {
          alert(data.error || "Error al eliminar el curso");
          console.log(data.error);
        } else {
          alert("Curso eliminado con éxito");
          window.location.href = '../profesor/dashboard/dashboard.html'
        } 
      } catch (error) {
        alert ("Ocurrió un error al eliminar el curso");
        console.log(error)
      }
    }


//FUNCIONES DE LA CLASE----------------------------------------------------------------------------------------------
async function addClase(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const params = new URLSearchParams(window.location.search);
  const cursoId = parseInt(params.get("id"));
  formData.append("cursoId", cursoId);

  try {
    const res = await fetch("http://localhost:3000/clase/new", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Error al crear la clase");
    } else {
      alert("Clase creada con éxito!");
      console.log(data);
      getClasesProfesor(cursoId);
    }
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    alert("Ocurrió un error al crear el curso.");
  }
}


async function deleteClase(claseId) {
  try {
    const confirmacion = confirm("¿Estás seguro de eliminar esta clase?");
        if (!confirmacion) return;

        const res = await fetch(`http://localhost:3000/clase/delete/${claseId}`, {
          method: "DELETE",
        });

        const data = await res.json();
        if (!res.ok) {
          alert(data.error || "Error al eliminar la clase");
          console.log(data.error);
        } else {
          alert("Clase eliminado con éxito");
        } 
      } catch (error) {
        alert ("Ocurrió un error al eliminar la clase");
      }
    }
