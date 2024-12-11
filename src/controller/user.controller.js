const User = require('../models/user.model');

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    const { name, email, password, role, phone, address } = req.body;
    try {
        // Validar si el usuario ya existe
        const existingUser = await User.findOne({ correo });
        if (existingUser) return res.status(400).json({ message: 'El correo ya está registrado.' });

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const newUser = new User({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            role,
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente.', newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario.', error });
    }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('animals');
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
    try {
        const { name, phone, address } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, phone, address },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.loginUser = async (req, res) => {
    const { correo, password } = req.body;

    try {
        // Validar si el usuario existe
        const user = await User.findOne({ correo });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

        // Validar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Contraseña incorrecta.' });

        // Verificar que la clave secreta existe
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error('JWT_SECRET no está definido en las variables de entorno.');
        }

        // Generar token
        const token = jwt.sign({ id: user._id, rol: user.rol }, secretKey, {
            expiresIn: '1h',
        });
        user.password = ':masked:';
        res.status(200).json({ message: 'Inicio de sesión exitoso.', token, user });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión.', error: error.message });
    }
};

