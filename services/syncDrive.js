const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

// Ruta a las credenciales descargadas
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');

// Ruta local donde se guardarán las imágenes
const LOCAL_FOLDER = path.join(__dirname, 'images');

// ID de la carpeta en Google Drive
const DRIVE_FOLDER_ID = '19pH488O5Et4DLr7gNRoyYTiB6Cy2dCmT';

// Autenticar con OAuth2
async function authenticate() {
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });
  return google.drive({ version: 'v3', auth });
}

// Descargar un archivo desde Google Drive
async function downloadFile(drive, fileId, fileName) {
  const filePath = path.join(LOCAL_FOLDER, fileName);

  const dest = fs.createWriteStream(filePath);
  await drive.files.get(
    { fileId, alt: 'media' },
    { responseType: 'stream' },
    (err, res) => {
      if (err) {
        console.error(`Error al descargar ${fileName}:`, err.message);
        return;
      }

      res.data
        .on('end', () => console.log(`Descargado: ${fileName}`))
        .on('error', (err) => console.error(`Error en stream: ${err.message}`))
        .pipe(dest);
    }
  );
}

// Obtener y descargar archivos de la carpeta de Drive
async function syncDriveFolder() {
  const drive = await authenticate();

  // Crear la carpeta local si no existe
  if (!fs.existsSync(LOCAL_FOLDER)) {
    fs.mkdirSync(LOCAL_FOLDER, { recursive: true });
  }

  try {
    const response = await drive.files.list({
      q: `'${DRIVE_FOLDER_ID}' in parents and trashed=false`,
      fields: 'files(id, name)',
    });

    const files = response.data.files;
    if (!files || files.length === 0) {
      console.log('No se encontraron archivos en la carpeta.');
      return;
    }

    console.log(`Archivos encontrados: ${files.length}`);
    for (const file of files) {
      await downloadFile(drive, file.id, file.name);
    }
  } catch (err) {
    console.error('Error al sincronizar archivos:', err.message);
  }
}


module.exports = syncDriveFolder;
