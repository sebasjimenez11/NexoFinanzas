// ALERTA DE CONFIRMACIÓN (ÉXITO)
export const alertOk = (titulo, mensaje) => {
  Swal.fire({
    title: titulo || '¡Éxito!',
    text: mensaje || 'La operación se realizó correctamente.',
    icon: 'success',
    confirmButtonText: 'Aceptar',
    timer: 3000,
    background: '#e6ffe6', // Color verde claro
    color: '#006400', // Texto verde oscuro
    customClass: {
      confirmButton: 'btn-success', // Botón verde oscuro
    },
  });
};

// ALERTA DE PREVENCIÓN (WARNING)
export const alertWarning = (titulo, mensaje) => {
  Swal.fire({
    title: titulo || '¡Atención!',
    text: mensaje || 'Por favor verifica la información ingresada.',
    icon: 'warning',
    confirmButtonText: 'Entendido',
    timer: 3000,
    background: '#fff8e1', // Color amarillo claro
    color: '#ff8c00', // Texto naranja oscuro
    customClass: {
      confirmButton: 'btn-warning', // Botón naranja oscuro
    },
  });
};

// ALERTA DE ERROR
export const alertError = (titulo, mensaje) => {
  Swal.fire({
    title: titulo || '¡Error!',
    text: mensaje || 'Ha ocurrido un error inesperado.',
    icon: 'error',
    confirmButtonText: 'Cerrar',
    background: '#ffe6e6', // Color rojo claro
    color: '#8b0000', // Texto rojo oscuro
    customClass: {
      confirmButton: 'btn-error', // Botón rojo oscuro
    },
  });
};

// ALERTA INFORMATIVA
export const alertInfo = (titulo, mensaje) => {
  Swal.fire({
    title: titulo || 'Información',
    text: mensaje || 'Esto es un mensaje informativo.',
    icon: 'info',
    confirmButtonText: 'Ok',
    timer: 3000,
    background: '#e6f7ff', // Color azul claro
    color: '#004085', // Texto azul oscuro
    customClass: {
      confirmButton: 'btn-info', // Botón azul oscuro
    },
  });
};

// CONFIRMACIÓN DE ACCIÓN
export const alertConfirm = (titulo, mensaje, callback) => {
  Swal.fire({
    title: titulo || '¿Estás seguro?',
    text: mensaje || 'No podrás deshacer esta acción.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, confirmar',
    cancelButtonText: 'Cancelar',
    background: '#fefefe',
    color: '#333',
    customClass: {
      confirmButton: 'btn-confirm', // Botón oscuro para confirmar
      cancelButton: 'btn-cancel',   // Botón gris oscuro para cancelar
    },
  }).then((result) => {
    if (result.isConfirmed) {
      callback(); // Ejecuta una función si se confirma
    }
  });
};
