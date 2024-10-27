import User from "../models/User.js";
import jwt from 'jsonwebtoken';

// Obtener lista de usuarios
async function list(req, res) {
    try {
        const userList = await User.find({ deletedAt: null });
        return res.json(userList);
    } catch (err) {
        console.error('Error fetching user list:', err.message);
        return res.status(500).json({ message: 'Error del servidor' });
    }
}

// Crear un nuevo usuario
async function create(req, res) {
    try {
        const newUser = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            avatar: req.file ? req.file.filename : null // Asegúrate de que el archivo se suba correctamente
        });
        
        // Generar un token para el nuevo usuario
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        return res.status(201).json({ message: "Usuario creado", user: newUser, token });
    } catch (error) {
        console.error('Error creating user:', error.message);
        
        if (error.name === 'MongoError' && error.code === 11000) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso.' });
        }
        
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
}

// Eliminar un usuario (marcar como eliminado)
async function destroy(req, res) {
    try {
        await User.findByIdAndUpdate(req.params.id, { deletedAt: Date.now() });
        return res.json({ message: "Usuario borrado" });
    } catch (err) {
        console.error('Error deleting user:', err.message);
        return res.status(500).json({ message: 'Error del servidor' });
    }
}

// Obtener perfil del usuario
async function getUserProfile(req, res) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'No se proporcionó un token de autorización' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await User.findById(userId).select('firstname lastname avatar'); 
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.json({
            name: `${user.firstname} ${user.lastname}`,
            avatar: user.avatar // Esto debería contener el nombre del archivo
        });
    } catch (err) {
        console.error('Error fetching user profile:', err.message);
        return res.status(500).json({ message: 'Error del servidor', error: err.message });
    }
}

// Exporta el controlador
export default { create, destroy, list, getUserProfile };
