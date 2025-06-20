document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.ver-detalle-tarea').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const tareaId = this.getAttribute('data-id');
      fetch(`/api/tarea_estudiante/${tareaId}`)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            document.getElementById('detalleTareaBody').innerHTML = `<div class="alert alert-danger">${data.error}</div>`;
          } else {
            document.getElementById('detalleTareaBody').innerHTML = `
              <ul class="list-group">
                <li class="list-group-item"><strong>Título:</strong> ${data.titulo}</li>
                <li class="list-group-item"><strong>Descripción:</strong> ${data.descripcion}</li>
                <li class="list-group-item"><strong>Fecha de vencimiento:</strong> ${data.fecha_vencimiento}</li>
                <li class="list-group-item"><strong>Prioridad:</strong> ${data.prioridad}</li>
                <li class="list-group-item"><strong>Estado:</strong> ${data.estado}</li>
                <li class="list-group-item">
                  <strong>Archivo:</strong>
                  ${data.ruta_archivo ? `<a href="/descargar_archivo/${data.ruta_archivo}">Descargar</a>` : 'No hay archivo adjunto.'}
                </li>
              </ul>
            `;
          }
          // Mostrar el modal (Bootstrap 5)
          let modal = new bootstrap.Modal(document.getElementById('detalleTareaModal'));
          modal.show();
        })
        .catch(err => {
          document.getElementById('detalleTareaBody').innerHTML = `<div class="alert alert-danger">Error al cargar el detalle.</div>`;
          let modal = new bootstrap.Modal(document.getElementById('detalleTareaModal'));
          modal.show();
        });
    });
  });
});

