const courses= [
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
    cursos();
});

function cursos(){
    scrollCursos = document.getElementById('cursos-algunos');
    for (let index = 0; index < 5; index++) {
        const curso = document.createElement('div');
        curso.className = 'card';
        curso.innerHTML = `
        <img src=${courses[index].img} class="card-img-top" alt="Curso${index}">
        <div class="card-body">
            <h5 class="card-title">${courses[index].title}</h5>
            <p class="card-text text-muted">${courses[index].description}</p>
            <a href="cursos/curso.html?id=${courses[index].id}&from=index" class="btn btn-outline-primary mt-2">Ver curso</a>
        </div>
        `;
        scrollCursos.appendChild(curso);
    }
    const vermas = document.createElement('a');
    vermas.href = "cursos/cursos.html?from=index&id=-1";
    vermas.className = "btn btn-primary";
    vermas.innerHTML = `Ver más`;
    scrollCursos.appendChild(vermas);
}