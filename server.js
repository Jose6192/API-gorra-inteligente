if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const hatRoutes = require('./routes/hatRoutes');
const ubicacionesRoutes = require('./routes/ubicacionesRoutes');
const imagesRoutes = require('./routes/imagesRoutes');
const app = express();
const cors = require('cors');
const syncDriveFolder = require('./services/syncDrive');
const path = require('path');

app.use(express.json());
app.use(cors({
    origin: '*', // Permitir todos los orígenes
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Middleware para servir archivos estáticos
const IMAGES_FOLDER = path.join(__dirname, 'images');
app.use('/images', express.static(IMAGES_FOLDER));

// Sincronizar imágenes de Google Drive
syncDriveFolder();

// Rutas
app.get('/', (req, res) => {
    res.send('API funcionando');
});
app.use('/auth', authRoutes);
app.use('/hats', hatRoutes);
app.use('/ubicaciones', ubicacionesRoutes);
app.use('/images', imagesRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});


