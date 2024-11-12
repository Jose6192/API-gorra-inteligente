const connection = require('../config/db');

exports.guardarUbicacion = (req, res) => {
  const { latitud, longitud, id_gorra } = req.body;

  // Validación de los parámetros
  if (!latitud || !longitud || !id_gorra) {
    return res.status(400).json({ error: 'Faltan parámetros '});
  }

  // Validar rangos de latitud y longitud
  if (latitud < -90 || latitud > 90 || longitud < -180 || longitud > 180) {
    return res.status(400).json({ error: 'Las coordenadas no son válidas.' });
  }

  // Consulta SQL para insertar la ubicación en la base de datos
  const query = 'INSERT INTO Ubicaciones (id_gorra, latitud, longitud) VALUES (?, ?, ?)';

  connection.query(query, [id_gorra, latitud, longitud], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al guardar la ubicación' });
    }

    res.status(201).json({
      message: 'Ubicación guardada correctamente',
    });
  });
};

exports.obtenerUbicaciones = (req, res) => {
  const query = `
    SELECT 
      ubicaciones.*, 
      gorras.nombre AS gorra_nombre, 
      gorras.codigo AS gorra_codigo
    FROM ubicaciones
    LEFT JOIN gorras ON ubicaciones.gorra_id = gorras.id
  `;
  
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener las ubicaciones' });
    }

    res.status(200).json(results);
  });
};

// Para actualizar una ubicación existente
exports.actualizarUbicacion = (req, res) => {
  const { id } = req.params;  // ID de la ubicación a actualizar
  const { latitud, longitud, gorraId } = req.body;  // Nuevos datos de la ubicación

  // Validación de los parámetros
  if (!latitud || !longitud || !gorraId) {
    return res.status(400).json({ error: 'Faltan parámetros: latitud, longitud, gorraId' });
  }

  // Validar rangos de latitud y longitud
  if (latitud < -90 || latitud > 90 || longitud < -180 || longitud > 180) {
    return res.status(400).json({ error: 'Las coordenadas no son válidas.' });
  }

  // Consulta SQL para actualizar la ubicación
  const query = `
    UPDATE ubicaciones 
    SET latitud = ?, longitud = ?, gorra_id = ?
    WHERE id = ?
  `;

  connection.query(query, [latitud, longitud, gorraId, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar la ubicación' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Ubicación no encontrada.' });
    }

    res.status(200).json({
      message: 'Ubicación actualizada correctamente',
      id: id,
      latitud: latitud,
      longitud: longitud,
      gorraId: gorraId
    });
  });
};
