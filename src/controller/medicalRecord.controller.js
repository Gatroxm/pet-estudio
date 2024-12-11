const MedicalRecord = require('../models/medicalRecord.model');

// Crear una nueva historia clínica
exports.createMedicalRecord = async (req, res) => {
    try {
        const { date, veterinarian, notes, treatments, dietRecommendations, vaccinations, deworming, surgeries, nextAppointment, animal } = req.body;

        const record = new MedicalRecord({
            date,
            veterinarian,
            notes,
            treatments,
            dietRecommendations,
            vaccinations,
            deworming,
            surgeries,
            nextAppointment,
            animal
        });

        await record.save();

        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Obtener todas las historias clínicas
exports.getMedicalRecordsByAnimal = async (req, res) => {
    try {
        const records = await MedicalRecord.find({ animal: req.params.animalId }).populate('animal');
        if (!records.length) return res.status(404).json({ message: 'No se encontraron historias clínicas para este animal.' });

        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateMedicalRecord = async (req, res) => {
    try {
        const { veterinarian, notes, treatments, dietRecommendations, vaccinations, deworming, surgeries, nextAppointment } = req.body;

        const record = await MedicalRecord.findByIdAndUpdate(
            req.params.id,
            {
                veterinarian,
                notes,
                treatments,
                dietRecommendations,
                vaccinations,
                deworming,
                surgeries,
                nextAppointment
            },
            { new: true }
        );

        if (!record) return res.status(404).json({ message: 'Historia clínica no encontrada.' });

        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteMedicalRecord = async (req, res) => {
    try {
        const record = await MedicalRecord.findByIdAndDelete(req.params.id);
        if (!record) return res.status(404).json({ message: 'Historia clínica no encontrada.' });

        res.status(200).json({ message: 'Historia clínica eliminada.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
