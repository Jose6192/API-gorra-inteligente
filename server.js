if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const hatRoutes = require('./routes/hatRoutes');
const ubicacionesRoutes = require('./routes/ubicacionesRoutes');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: '*', // Permitir todos los orígenes
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));
app.get('/', (req, res) => {
    res.send('API funcionando');
});
app.use('/auth', authRoutes);
app.use('/hats', hatRoutes);
app.use('/ubicaciones', ubicacionesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});


