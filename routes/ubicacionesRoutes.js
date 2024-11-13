const express = require('express');
const router = express.Router();
const ubicacionesController = require('../controllers/ubicacionesController');

router.post('/guardar-ubicacion', ubicacionesController.guardarUbicacion);
router.get('/obtener-ubicaciones', ubicacionesController.obtenerUbicaciones);
router.patch('/actualizar-ubicacion', ubicacionesController.actualizarUbicacion);  // Para actualizar

module.exports = router;
