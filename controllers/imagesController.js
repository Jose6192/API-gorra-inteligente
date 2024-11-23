const fs = require('fs');
const path = require('path');

const IMAGES_FOLDER = path.join(__dirname, '../images');

// Controlador para listar todas las imágenes
exports.listImages = (req, res) => {
  fs.readdir(IMAGES_FOLDER, (err, files) => {
    if (err) {
      console.error('Error al leer la carpeta de imágenes:', err);
      return res.status(500).json({ error: 'No se pudieron cargar las imágenes' });
    }

    // Devolver nombres de archivo como lista
    const images = files.map((file) => `/images/${file}`);
    res.json({ images });
  });
};

// Controlador para servir una imagen específica
exports.getImage = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(IMAGES_FOLDER, filename);

  // Verifica si el archivo existe
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Imagen no encontrada' });
  }

  // Envía la imagen como respuesta
  res.sendFile(filePath);
};
