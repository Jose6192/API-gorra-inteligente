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
   const id_usuario = req.body;
  const query = "SELECT Ubicaciones.* FROM Ubicaciones  JOIN Gorras ON Ubicaciones.id_gorra = Gorras.id_gorra WHERE Gorras.id_usuario = ?;";
  
  connection.query(query, [id_usuario], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Error al obtener las ubicaciones' });
    }

    res.status(200).json(results);
  });
};

// Para actualizar una ubicación existente
exports.actualizarUbicacion = (req, res) => {
  const { latitud, longitud, id_gorra } = req.body;  // Nuevos datos de la ubicación

  // Validación de los parámetros
  if (!latitud || !longitud || !id_gorra) {
    return res.status(400).json({ error: 'Faltan parámetros: latitud, longitud, id_gorra' });
  }

  // Validar rangos de latitud y longitud
  if (latitud < -90 || latitud > 90 || longitud < -180 || longitud > 180) {
    return res.status(400).json({ error: 'Las coordenadas no son válidas.' });
  }

  // Consulta SQL para actualizar la ubicación
  const query = "UPDATE Ubicaciones SET latitud = ?, longitud = ? WHERE id_gorra = ?;"

  connection.query(query, [latitud, longitud, id_gorra], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar la ubicación' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Ubicación no encontrada.' });
    }

    res.status(200).json({
      message: 'Ubicación actualizada correctamente'
    });
  });
};
