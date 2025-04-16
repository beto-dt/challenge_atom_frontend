/**
 * Configuraciones generales de la aplicación
 */
export const AppSettings = {
  appName: 'TaskManager',
  storage: {
    userKey: 'currentUser',
    tasksKey: 'userTasks'
  },
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 25, 50]
  },
  durations: {
    toastMessage: 3000,
    loadingTimeout: 30000
  },
  validation: {
    minPasswordLength: 6,
    maxTitleLength: 100,
    maxDescriptionLength: 500
  },
  dateFormat: {
    default: 'dd/MM/yyyy',
    withTime: 'dd/MM/yyyy HH:mm',
    iso: 'yyyy-MM-dd'
  }
};
/**
 * Rutas principales de la aplicación
 */
export const AppRoutes = {
  login: '/login',
  tasks: '/tasks',
  notFound: '/not-found'
};
