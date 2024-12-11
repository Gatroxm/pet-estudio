const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, // Gato, Perro, etc.
    breed: { type: String },
    foodType: { type: String }, // Tipo de comida que consume
    weight: { type: Number },
    age: { type: Number, required: true }, // Edad en meses
    neutered: { type: Boolean, default: false }, // Castrado o no
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true }, // Relación con cliente
    nutritionalTable: {
        recommendedFood: { type: Number }, // Cantidad de comida recomendada
    },
    alerts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Alert' }], // Relación con alertas
    medicalHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MedicalRecord' }] // Relación con historias clínicas
});

module.exports = mongoose.model('Animal', AnimalSchema);
