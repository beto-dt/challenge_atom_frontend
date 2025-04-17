# Aplicación de Gestión de Tareas - Challenge_Atom

## Visión general
Esta aplicación permite a los usuarios gestionar sus tareas diarias, con capacidad para crear, editar, eliminar y marcar tareas como completadas. Implementa una arquitectura limpia con separación de responsabilidades.

## Tecnologías
- Angular 18
- TypeScript
- Firebase (Hosting, Firestore, Cloud Function)
- Angular Material

## Requisitos previos
- Node.js (v18+)
- Angular CLI (v17+)
- Firebase CLI (opcional para desarrollo local)

## Instalación
1. Clonar el repositorio: `git clone https://github.com/beto-dt/challenge_atom_frontend`
2. Instalar dependencias: `npm install`
3. Agregar a la raiz los archivos .env y .env.production (EL archivo de las secret va a estar adjuntado en el correo)
4. Ejecutamos el siguiente comando para generar el archivo environment.ts
   - `npm run config` => para generar las secret en modo local
   - `npm run config:prod` => para generar las secret en modo production
5. Iniciar servidor de proyecto: `npm run start`

## Estructura del proyecto
La aplicación sigue arquitectura limpia con las siguientes capas:

- **Presentación**: Componentes, pages, facades
- **Dominio**: Modelos, interfaces de repositorios
- **Data**: Implementaciones de repositorios, servicios API
- **Core**: Servicios compartidos globales

## Características
- Autenticación simplificada (solo email)
- Gestión completa de tareas (CRUD)
- Diseño responsive
- Interfaz de usuario intuitiva
- Generador del archivo environment a partir del archivo .env(secrets)'

## Subir a Hosting Firebase
1. Nos logemoas en Firebas : `firbase login`
2. Contruimos el proyecto : `npm run build`
3. Subir el proyecto a Firebase : `firebase deploy`

- Como dato adicional debe estar apuntando en el archivo firebase.json a esta dirección de carpetas => 'dist/tareas-app/browser'
