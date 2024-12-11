const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user.routes');
const animalRoutes = require('./routes/animal.routes');
const medicalRecordRoutes = require('./routes/medicalRecord.routes');
const alertRoutes = require('./routes/alert.routes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/alerts', alertRoutes);

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/veterinary', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error al conectar a la base de datos:', err));

// Puerto
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
