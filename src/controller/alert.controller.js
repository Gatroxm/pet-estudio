const Alert = require('../models/alert.model');

// Crear una nueva alerta
exports.createAlert = async (req, res) => {
    try {
        const { type, date, description, animal } = req.body;
        const alert = new Alert({ type, date, description, animal });
        await alert.save();
        res.status(201).json(alert);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las alertas
exports.getAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find().populate('animal');
        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Completar una alerta
exports.completeAlert = async (req, res) => {
    try {
        const alert = await Alert.findByIdAndUpdate(
            req.params.id,
            { completed: true },
            { new: true }
        );
        if (!alert) return res.status(404).json({ message: 'Alerta no encontrada' });
        res.status(200).json(alert);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
