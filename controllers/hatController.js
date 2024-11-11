const db = require('../config/db');

// Registrar
exports.registerHat = (req, res) => {
    const { id_usuario, modelo, nombre, estado } = req.body;

    db.query(
        'INSERT INTO Gorras (id_usuario, modelo, nombre, estado) VALUES (?, ?, ?, ?)',
        [id_usuario, modelo, nombre, estado],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Gorra registrada exitosamente.' });
        }
    );
};

// Editar
exports.editHat = (req, res) => {
    const { id } = req.params;
    const { nombre, codigo } = req.body;

    db.query(
        'UPDATE gorras SET nombre = ?, codigo = ? WHERE id = ?',
        [nombre, codigo, id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.affectedRows === 0) return res.status(404).json({ message: 'Gorra no encontrada.' });
            res.json({ message: 'Gorra actualizada exitosamente.' });
        }
    );
};

// Eliminar
exports.deleteHat = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM Gorras WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Gorra no encontrada.' });
        res.json({ message: 'Gorra eliminada exitosamente.' });
    });
};

//lista de las gorras
//DEBEMOS HACER QUE COICIDAN LOS DATOS PARA LOCATIONPAGE, INGRESA LOS DATOS DE LA UBICACION DE LAS GORRAS
exports.getHats = (req, res) => {
    const { id_usuario } = req.params;
    db.query('SELECT Gorras.id_gorra, Gorras.id_usuario, Gorras.modelo, Gorras.nombre, Gorras.estado, Ubicaciones.latitud AS coordinate_lat, Ubicaciones.longitud AS coordinate_lng  FROM Gorras AS Gorras LEFT JOIN Ubicaciones AS Ubicaciones ON Gorras.id_gorra = Gorras.id_gorra WHERE Gorras.id_usuario = ?', [id_usuario], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};