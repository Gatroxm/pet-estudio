const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
    type: { type: String, required: true }, // Vacuna, Desparasitante, Cita médica, etc.
    date: { type: Date, required: true }, // Fecha programada
    description: { type: String },
    animal: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true }, // Relación con animal
    completed: { type: Boolean, default: false } // Si ya se atendió la alerta
});

module.exports = mongoose.model('Alert', AlertSchema);