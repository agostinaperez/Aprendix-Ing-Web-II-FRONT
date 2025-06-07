const cursos= [
  {id:0, title: 'Desarrollo Web', description: 'Aprende HTML, CSS, JavaScript y más.', img: "resources/cursoWeb.png" },
  {id:1, title: 'Diseño UX/UI', description: 'Crea experiencias digitales efectivas.', img: "resources/cursoUXUI.png" },
  {id:2, title: 'Marketing Digital', description: 'Domina estrategias de marketing online.', img: "resources/cursoMarketing.png" },
  {id:3, title: 'Python para Principiantes', description: 'Aprende desde cero practicando.', img: "resources/cursoPython.png" },
  {id:4, title: 'Gestión de Proyectos', description: 'Planifica y lidera proyectos con éxito.', img: "resources/cursoGestProy.png" },
  {id:5, title: 'Introducción a JavaScript', description: 'Aprende los fundamentos de JavaScript desde cero.', img: "resources/cursoJava.jpg" },
  {id:6, title: 'React Avanzado', description: 'Domina React y crea aplicaciones web modernas.', img: "resources/cursoReact.jpg" },
  {id:7, title: 'Python para Ciencia de Datos', description: 'Analiza datos y crea modelos predictivos con Python.', img: "resources/cursoData.jpg" }
];

document.addEventListener("DOMContentLoaded", () => {
    algunoscursos();
});

function algunoscursos(){
    scrollCursos = document.getElementById('cursos-algunos');
    for (let index = 0; index < 5; index++) {
        const curso = document.createElement('div');
        curso.className = 'card';
        curso.innerHTML = `
        <img src=${cursos[index].img} class="card-img-top" alt="Curso${index}">
        <div class="card-body">
            <h5 class="card-title">${cursos[index].title}</h5>
            <p class="card-text text-muted">${cursos[index].description}</p>
            <a href="cursos/curso.html?id=${cursos[index].id}&from=index" class="btn btn-outline-primary mt-2">Ver curso</a>
        </div>
        `;
        scrollCursos.appendChild(curso);
    }
    const vermas = document.createElement('button');
    vermas.addEventListener("click", () => {showCursos(cursos);});
    vermas.className = "btn btn-primary";
    vermas.innerHTML = `Ver más`;
    scrollCursos.appendChild(vermas);
}
function showCursos(cursos) {
  let todosCursos = document.getElementById("todos-cursos");
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