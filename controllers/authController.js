import jwt from "jsonwebtoken";
import User from "../models/User.js";

async function login(req, res) {
    try {
        // Buscar el usuario por correo electrónico
        const user = await User.findOne({ email: req.body.email });
        
        // Si el usuario no existe o la contraseña no coincide, devuelve un error 401
        if (!user) {
            return res.status(401).json({ message: "Las credenciales no son válidas" });
        }

        // Comparar la contraseña usando bcrypt (o el método que utilices)
        const isPasswordCorrect = await user.hashCompare(req.body.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Las credenciales no son válidas" });
        }

        // Generar el token JWT si las credenciales son correctas
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

// Verificación de token
async function tokenIsValid(req, res) {
    // Verificar si el token es válido usando el middleware
    if (req.auth) {
        return res.json({ valid: true });
    } else {
        return res.status(401).json({ valid: false });
    }
}

export default { login, tokenIsValid };
