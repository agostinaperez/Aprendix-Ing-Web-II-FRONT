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
      showCursos(data);
    }
  } catch (error) {
    console.error("Error al traer los cursos:", error);
    alert("Ocurrió un error al traer los cursos.");
  }

}
function showCursos(cursos) {
  let todosCursos = document.getElementById('todos-cursos');
  todosCursos.innerHTML = '<h1 class="display-4 fw-bold mb-3 text-center" style="padding: 50px;">Todos los cursos</h1>';
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
              <a href="cursos/curso.html?id=${curso.id}" class="btn btn-outline-primary mt-2">Ver curso</a>
            </div>
          </div>
        </div>
        `;
    todosCursos.appendChild(col);
  });
}