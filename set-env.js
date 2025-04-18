const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const environmentsDir = path.join(__dirname, 'src', 'environments');

if (!fs.existsSync(environmentsDir)) {
  console.log(`Creando directorio: ${environmentsDir}`);
  fs.mkdirSync(environmentsDir, { recursive: true });
}

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';

const result = dotenv.config({ path: envFile });

if (result.error) {
  console.error('Error al cargar archivo .env:', result.error);
  process.exit(1);
}

const environmentContent = `
// Este archivo se genera automáticamente - no editar manualmente
export const environment = {
  production: ${process.env.NODE_ENV === 'production'},
  apiUrl: '${process.env.API_URL || ''}',
  firebase: {
    apiKey: '${process.env.FIREBASE_API_KEY || ''}',
    authDomain: '${process.env.FIREBASE_AUTH_DOMAIN || ''}',
    projectId: '${process.env.FIREBASE_PROJECT_ID || ''}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET || ''}',
    messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID || ''}',
    appId: '${process.env.FIREBASE_APP_ID || ''}'
  }
};
`;

const targetPath = path.join(environmentsDir, 'environment.ts');

fs.writeFileSync(targetPath, environmentContent);

console.log(`Archivo de entorno generado: ${targetPath}`);
