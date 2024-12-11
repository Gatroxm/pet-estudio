const express = require('express');
const router = express.Router();
const medicalRecordController = require('../controller/medicalRecord.controller');

// Rutas de historias clínicas
router.post('/', medicalRecordController.createMedicalRecord); // Crear una nueva historia clínica
router.get('/animal/:animalId', medicalRecordController.getMedicalRecordsByAnimal); // Obtener historias clínicas por ID de animal
router.put('/:id', medicalRecordController.updateMedicalRecord); // Actualizar una historia clínica
router.delete('/:id', medicalRecordController.deleteMedicalRecord); // Eliminar una historia clínica

module.exports = router;
