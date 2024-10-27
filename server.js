import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import express from 'express';
import upload from './config/multer.config.js';
import { expressjwt as checkJwt } from 'express-jwt';
import productController from './controllers/productController.js';
import authController from './controllers/authController.js';
import userController from './controllers/userController.js';
import {
  createReview,
  getReviewById,
  getAllReviews,
  getReviewsByProductId,
} from './controllers/reviewController.js';

// Inicializa la aplicación
const app = express();
const router = express.Router();

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la carpeta de subida
const uploadDir = path.join(path.resolve(), 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configura el secreto JWT
const secret = process.env.JWT_SECRET || 'default_secret';

// Rutas de productos
router.get('/products', productController.list);
router.get('/products/:id', productController.find);
router.post('/products', checkJwt({ secret, algorithms: ['HS256'] }), productController.create); // Protegida por JWT
router.get('/products/categoria/:categoriaId', productController.findByCategory);

// Rutas de autenticación
router.post('/auth/login', authController.login);
router.post('/auth/register', upload.single('avatar'), userController.create);
router.post('/auth/validate', authController.tokenIsValid);

// Rutas de reseñas
router.post('/reviews', createReview); // Protegida por JWT
router.get('/reviews/:id', getReviewById);
router.get('/reviews', getAllReviews);
router.get('/reviews/products/:productoId', getReviewsByProductId); // Corrige el nombre del parámetro

// Ruta para obtener el perfil del usuario (requiere autenticación)
router.get('/user/profile', checkJwt({ secret, algorithms: ['HS256'] }), userController.getUserProfile);

// Usa el router en la aplicación
app.use('/api', router);

// Servir archivos estáticos desde la carpeta 'public'
app.use('/public', express.static(uploadDir));

// Middleware para servir avatares
router.get('/uploads/avatar/:avatarName', (req, res) => {
  const avatarName = req.params.avatarName;
  const avatarPath = path.join(uploadDir, avatarName);

  // Verifica si el avatar existe
  fs.stat(avatarPath, (err, stat) => {
    if (err || !stat.isFile()) {
      console.error('Avatar no encontrado:', avatarPath);
      return res.status(404).json({ message: 'Avatar no encontrado' });
    }

    // Sirve el avatar
    res.sendFile(avatarPath);
  });
});

// Middleware para servir imágenes de productos
router.get('/uploads/product/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(uploadDir, 'product', imageName);

  // Verifica si la imagen existe
  fs.stat(imagePath, (err, stat) => {
    if (err || !stat.isFile()) {
      console.error('Imagen no encontrada:', imagePath);
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }

    // Sirve la imagen
    res.sendFile(imagePath);
  });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Token inválido o no proporcionado.' });
  }
  console.error(err.stack);
  res.status(500).json({ message: 'Error del servidor' });
});

// Configuración del puerto y escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
