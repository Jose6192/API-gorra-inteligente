const express = require('express');
const router = express.Router();
const ubicacionesController = require('../controllers/ubicacionesController');

router.post('/guardar-ubicacion', ubicacionesController.guardarUbicacion);
router.get('/ubicaciones', ubicacionesController.obtenerUbicaciones);
router.put('/ubicacion/:id', ubicacionesController.actualizarUbicacion);  // Para actualizar

module.exports = router;
