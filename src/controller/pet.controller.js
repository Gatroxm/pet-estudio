const Animal = require('../models/pet.model');

// Crear un nuevo animal
exports.createAnimal = async (req, res) => {
    try {
        const { name, type, breed, foodType, weight, age, neutered, owner } = req.body;
        const animal = new Animal({ name, type, breed, foodType, weight, age, neutered, owner });
        await animal.save();
        res.status(201).json(animal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los animales
exports.getAnimals = async (req, res) => {
    try {
        const animals = await Animal.find().populate('owner').populate('alerts').populate('medicalHistory');
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un animal por ID
exports.getAnimalById = async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id).populate('owner').populate('alerts').populate('medicalHistory');
        if (!animal) return res.status(404).json({ message: 'Animal no encontrado' });
        res.status(200).json(animal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un animal
exports.updateAnimal = async (req, res) => {
    try {
        const { name, breed, foodType, weight, neutered } = req.body;
        const animal = await Animal.findByIdAndUpdate(
            req.params.id,
            { name, breed, foodType, weight, neutered },
            { new: true }
        );
        if (!animal) return res.status(404).json({ message: 'Animal no encontrado' });
        res.status(200).json(animal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un animal
exports.deleteAnimal = async (req, res) => {
    try {
        const animal = await Animal.findByIdAndDelete(req.params.id);
        if (!animal) return res.status(404).json({ message: 'Animal no encontrado' });
        res.status(200).json({ message: 'Animal eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
