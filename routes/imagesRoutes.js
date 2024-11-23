const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController');


// Ruta para listar todas las imágenes
router.get('/', imagesController.listImages);
// Ruta para servir una imagen específica
router.get('/:filename', imagesController.getImage);

module.exports = router;
