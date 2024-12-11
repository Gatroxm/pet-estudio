const mongoose = require('mongoose');

const MedicalRecordSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now }, // Fecha de la consulta
  veterinarian: { type: String, required: true }, // Nombre del veterinario
  notes: { type: String }, // Observaciones generales
  treatments: [{ name: String, dosage: String, duration: String }], // Medicinas y tratamientos
  dietRecommendations: { type: String }, // Cambios en la dieta
  vaccinations: [{ name: String, date: Date }], // Vacunas aplicadas
  deworming: { date: Date, type: String }, // Fecha y tipo de desparasitación
  surgeries: [{ name: String, date: Date, details: String }], // Detalles de cirugías realizadas
  nextAppointment: { type: Date }, // Fecha de próxima cita
  animal: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true } // Relación con animal
});

module.exports = mongoose.model('MedicalRecord', MedicalRecordSchema);
