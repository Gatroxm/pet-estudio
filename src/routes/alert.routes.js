const express = require('express');
const router = express.Router();
const alertController = require('../controller/alert.controller');

// Rutas de alertas
router.post('/', alertController.createAlert); // Crear una nueva alerta
router.get('/', alertController.getAlerts); // Obtener todas las alertas
router.put('/:id', alertController.completeAlert); // Completar una alerta

module.exports = router;

