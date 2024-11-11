const mysql = require('mysql2');


const db = mysql.createConnection({
    host: '34.174.127.163',
    user: 'root',
    password: 'R00t',
    database: 'gorra_inteligente'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos MySQL:', err);
    } else {
        console.log('Conectado a la base de datos MySQL.');
    }
});


module.exports = db;
