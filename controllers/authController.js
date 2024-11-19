const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro
exports.register = async (req, res) => {
    const { nombre, correo, contrasena } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    db.query(
        'INSERT INTO Usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)',
        [nombre, correo, hashedPassword],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Usuario registrado exitosamente.' });
        }
    );
};

// Inicio de sesión
exports.login = (req, res) => {
    const { nombre, contrasena } = req.body;
    db.query('SELECT * FROM Usuarios WHERE nombre = ?', [nombre], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado.' });

        const user = results[0];
        const isMatch = await bcrypt.compare(contrasena, user.contraseña);

        if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta.'});

        const token = jwt.sign({ id: user.id_usuario }, 'secret', { expiresIn: '1h' });
        res.json({ token });
        
    });
};

// Editar
exports.editUser = async (req, res) => {
    const { id_usuario } = req.params;
    const { nombre, correo, contraseña } = req.body;

    const params = [];
    let query = 'UPDATE Usuarios SET nombre = ?, correo = ?';
    params.push(nombre, correo);

    if (contraseña) {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        query += ', contraseña = ?';
        params.push(hashedPassword);
    }

    query += ' WHERE id_usuario = ?';
    params.push(id_usuario);

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado.' });
        res.json({ message: 'Usuario actualizado exitosamente.' });
    });
};


// Eliminar
exports.deleteUser = (req, res) => {
    const { id_usuario } = req.params;

    db.query('DELETE FROM Usuarios WHERE id = ?', [id_usuario], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado.' });
        res.json({ message: 'Usuario eliminado exitosamente.' });
    });
};
