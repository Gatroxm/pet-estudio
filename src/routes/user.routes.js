const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

// Rutas de usuarios
router.post('/', userController.createUser); // Crear un nuevo usuario
router.get('/', userController.getUsers); // Obtener todos los usuarios
router.get('/:id', userController.getUserById); // Obtener un usuario por ID
router.put('/:id', userController.updateUser); // Actualizar un usuario
router.delete('/:id', userController.deleteUser); // Eliminar un usuario

module.exports = router;
