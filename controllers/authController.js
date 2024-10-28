import User from '../models/User.js'; // Importar el modelo de usuario
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

// Registro de nuevo usuario
export const register = async (req, res) => {
  // Validar la existencia de todos los campos requeridos
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Errores de validación:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está en uso.' });
    }

    if (!password || password.length < 5) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 5 caracteres.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Contraseña hasheada al registrar:', hashedPassword);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      avatar: req.file ? req.file.filename : null,
    });

    const savedUser = await newUser.save();
    console.log('Usuario registrado:', savedUser);
    res.status(201).json({ message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    console.error('Error al registrar el usuario:', error.message);
    res.status(500).json({ message: 'Error al registrar el usuario.', error: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar si los campos son requeridos
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos.' });
    }

    // Buscar al usuario en la base de datos
    const user = await User.findOne({ email });
    console.log('Usuario encontrado:', user); // Imprime el usuario encontrado

    // Si no se encuentra el usuario, retorna un error
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Resultado de la comparación de contraseñas:', isMatch); // Imprime el resultado de la comparación

    // Si la contraseña no coincide, retorna un error
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    // Generar un token JWT con expiración
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Expira en 1 hora

    // Responder con el token y los datos del usuario
    res.status(200).json({
      message: 'Inicio de sesión exitoso.',
      token,
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error.message);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};




// Validación del token
export const tokenIsValid = (req, res) => {
  const token = req.header('user_token');

  if (!token) return res.status(401).json({ message: 'No se proporcionó token, autorización denegada.' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ valid: true });
  } catch (error) {
    res.status(401).json({ message: 'Token no válido.' });
  }
};

// Exportar otros métodos también
export default {
  login,
  register,
  tokenIsValid,
};
