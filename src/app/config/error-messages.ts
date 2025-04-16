/**
 * Mensajes de error para validación de formularios
 */
export const ValidationErrors = {
  required: 'Este campo es obligatorio',
  email: 'Por favor, introduce un correo electrónico válido',
};

export const AuthErrors = {
  session: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
  occasional_error: 'Ha ocurrido un error inesperado',
  bad_request: 'Solicitud incorrecta',
  unauthorized: 'No autorizado',
  access_prohibited: 'Acceso prohibido',
  resource_not_found: 'Recurso no encontrado',
  internal_server_error: 'Error interno del servidor',
  no_internet_connection: 'Sin conexión a Internet'
};

export const ServiceErrors = {
  session: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
  occasional_error: 'Ha ocurrido un error. Por favor, inténtalo de nuevo.',
  incorrect_data: 'Datos incorrectos. Verifica la información e inténtalo de nuevo.',
  resource_not_found: 'Recurso no encontrado',
  access_prohibited: 'No tienes permisos para realizar esta acción.',
  internal_server_error: 'Error en el servidor. Inténtalo más tarde.',
  no_internet_connection: 'No se pudo conectar con el servidor. Verifica tu conexión a Internet.'
};

export const ModulesErrors = {
  code_module_errpr: 'CoreModule ya está cargado. Debe importarse solo en AppModule.',
};
