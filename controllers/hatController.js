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
    const { id_gorra } = req.params;
    const { nombre, modelo, estado } = req.body;

    db.query(
        'UPDATE Gorras SET nombre = ?, modelo = ?, estado = ?, WHERE id = ?',
        [nombre, modelo, estado, id_gorra],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.affectedRows === 0) return res.status(404).json({ message: 'Gorra no encontrada.' });
            res.json({ message: 'Gorra actualizada exitosamente.' });
        }
    );
};

// Eliminar
exports.deleteHat = (req, res) => {
    const { id_gorra } = req.params;

    db.query('DELETE FROM Gorras WHERE id_gorra = ?', [id_gorra], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Gorra no encontrada.' });
        res.json({ message: 'Gorra eliminada exitosamente.' });
    });
};

//lista de las gorras
exports.getHats = (req, res) => {
    const { id_usuario } = req.params;
    db.query('SELECT Gorras.*, Ubicaciones.latitud, Ubicaciones.longitud FROM Gorras LEFT JOIN Ubicaciones ON Gorras.id_gorra = Ubicaciones.id_gorra WHERE id_usuario = ?', [id_usuario], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};