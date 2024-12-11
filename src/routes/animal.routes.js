const express = require('express');
const router = express.Router();
const animalController = require('../controller/pet.controller');
const authenticate = require('../middleware/auth.middleware');

// Rutas de animales
router.post('/', authenticate, animalController.createAnimal); // Crear un nuevo animal
router.get('/', authenticate, animalController.getAnimals); // Obtener todos los animales
router.get('/:id', authenticate, animalController.getAnimalById); // Obtener un animal por ID
router.put('/:id', authenticate, animalController.updateAnimal); // Actualizar un animal
router.delete('/:id', authenticate, animalController.deleteAnimal); // Eliminar un animal

module.exports = router;
