document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from");
    adaptnavbar(from);
    const cursoId = parseInt(params.get("id"));
    const curso = courses.find(c => c.id === cursoId);
    adaptInputs(curso);
})

function adaptInputs(curso){
    document.getElementById('titulo').placeholder = curso.titulo;
    document.getElementById("descripcion").placeholder = curso.descripcion;

    // Para el select no hay placeholder, así que puedes seleccionar el valor por defecto como ayuda visual
    const categoriaSelect = document.getElementById("categoria");
    for (const option of categoriaSelect.options) {
      if (option.value === curso.categoria) {
        option.selected = true;
        break;
      }
    }
}