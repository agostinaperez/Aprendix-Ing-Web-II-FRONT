window.addEventListener("DOMContentLoaded", async () => {
  getAllCursos();
});

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
      algunoscursos(data);
    }
  } catch (error) {
    console.error("Error al traer los cursos:", error);
    alert("Ocurrió un error al traer los cursos.");
  }

}

function algunoscursos(cursos){
    scrollCursos = document.getElementById('cursos-algunos');
   
    for (let index = 0; index < cursos.length && index < 5; index++) {
        const curso = document.createElement('div');
        curso.className = 'card';
        curso.innerHTML = `
        <img src="http://localhost:3000${cursos[index].imagen}" class="card-img-top" alt="Curso${index}">
        <div class="card-body">
            <h5 class="card-title">${cursos[index].titulo}</h5>
            <a href="cursos/curso.html?id=${cursos[index].id}" class="btn btn-outline-primary mt-2">Ver curso</a>
        </div>
        `;
        scrollCursos.appendChild(curso);
    }
    const vermas = document.createElement('button');
    vermas.addEventListener("click", () => {window.location.href='todos-cursos.html'});
    vermas.className = "btn btn-primary";
    vermas.innerHTML = `Ver más`;
    scrollCursos.appendChild(vermas);
}
