const courses = [
    { title: 'Desarrollo Web', description: 'Aprende HTML, CSS, JavaScript y más.', img: "../../resources/cursoWeb.png"},
    { title: 'Diseño UX/UI', description: 'Crea experiencias digitales efectivas.', img: "../../resources/cursoUXUI.png"},
    { title: 'Marketing Digital', description: 'Domina estrategias de marketing online.', img: '../../resources/cursoMarketing.png'},
    { title: 'Python para Principiantes', description: 'Domina React y crea aplicaciones web modernas.', img: '../../resources/cursoPython.png'},
    { title: 'Gestión de Proyectos', description: 'Analiza datos y crea modelos predictivos con Python.', img: '../../resources/cursoGestProy.png'}
];

const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');

function showCursos(){
    courses.forEach
}

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    resultsContainer.innerHTML = '';

    const filteredCourses = courses.filter(course => course.title.toLowerCase().includes(query));

    if (filteredCourses.length === 0) {
        resultsContainer.innerHTML = '<p class="text-center">No se encontraron resultados.</p>';
        return;
    }

    filteredCourses.forEach(course => {
        const col = document.createElement('div');
        col.className = 'card';
        col.innerHTML = `
        <div class="row justify-content-start">
          <div class="col-3">
            <img src="../../resources/cursoWeb.png" class="card-img" alt="Curso 1">
          </div>
          <div class="col-8">
            <div class="card-body">
              <h5 class="card-title">Desarrollo Web</h5>
              <p class="card-text text-muted"> <b>Aprende HTML, CSS, JavaScript y más.</b> Lorem ipsum dolor sit amet
                consectetur adipiscing, elit fames eros sapien congue aenean, ridiculus nec phasellus lacus etiam.
                Torquent fames suspendisse massa ac fermentum sodales, tristique integer nulla pharetra augue at aenean,
                maecenas luctus purus scelerisque feugiat. Malesuada faucibus fusce sociis class nostra dignissim leo
                facilisis posuere fames, ac semper potenti fringilla turpis elementum vitae gravida aenean, risus justo
                purus erat eget integer suscipit lacinia mollis.</p>
              <a href="#" class="btn btn-outline-primary mt-2">Ver curso</a>
            </div>
          </div>
        </div>
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">${course.title}</h5>
              <p class="card-text">${course.description}</p>
              <a href="#" class="btn btn-primary">Ver Curso</a>
            </div>
          </div>
        `;
        resultsContainer.appendChild(col);
    });
});