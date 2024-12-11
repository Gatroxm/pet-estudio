const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Contraseña cifrada
    role: { type: String, enum: ['Owner', 'Veterinarian', 'Admin'], required: true }, // Roles posibles
    phone: { type: String },
    address: { type: String },
    animals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }], // Relación con animales (solo para dueños)
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
