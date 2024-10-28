import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import express from 'express';
import upload from './config/multer.config.js';
import { expressjwt as checkJwt } from 'express-jwt';
import helmet from 'helmet';
import { body, validationResult } from 'express-validator';
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

// Configuración de la carpeta de subida
const uploadDir = path.join(path.resolve(), 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/public', express.static(uploadDir));

// Usa el router en la aplicación
app.use('/api', router);

// Rutas de productos
router.get('/products', productController.list);
router.get('/products/:id', productController.find);
router.post('/products', checkJwt, productController.create);
router.get('/products/categoria/:categoriaId', productController.findByCategory);

// Rutas de autenticación
router.post('/auth/login', authController.login);
router.post('/auth/register', upload.single('avatar'), authController.register);
router.post('/auth/validate', authController.tokenIsValid);

// Rutas de reseñas
router.post('/reviews', checkJwt, createReview);
router.get('/reviews/:id', getReviewById);
router.get('/reviews', getAllReviews);
router.get('/reviews/products/:productoId', getReviewsByProductId);

// Ruta para obtener el perfil del usuario (requiere autenticación)
router.get('/user/profile', checkJwt, userController.getUserProfile);

// Middleware para servir archivos
const serveFile = (dir) => (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(dir, fileName);

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      console.error('Archivo no encontrado:', filePath);
      return sendError(res, 'Archivo no encontrado', 404);
    }
    res.sendFile(filePath);
  });
};

// Middleware para servir avatares e imágenes de productos
router.get('/uploads/avatar/:fileName', serveFile(uploadDir));
router.get('/uploads/product/:fileName', serveFile(path.join(uploadDir, 'product')));

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return sendError(res, 'Token inválido o no proporcionado.', 401);
  }
  console.error(err.stack);
  sendError(res, 'Error del servidor.');
});

// Función sendError para manejar respuestas de error
function sendError(res, message, statusCode = 500) {
  res.status(statusCode).json({ message });
}

// Configuración del puerto y escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
