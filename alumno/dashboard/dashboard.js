const courses = [
    { title: 'Introducción a JavaScript', description: 'Aprende los fundamentos de JavaScript desde cero.' },
    { title: 'HTML y CSS para Principiantes', description: 'Construye sitios web con HTML y CSS.' },
    { title: 'React Avanzado', description: 'Domina React y crea aplicaciones web modernas.' },
    { title: 'Diseño UX/UI', description: 'Mejora la experiencia de usuario en tus proyectos.' },
    { title: 'Python para Ciencia de Datos', description: 'Analiza datos y crea modelos predictivos con Python.' }
];

const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');

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
        col.className = 'col-md-4';
        col.innerHTML = `
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