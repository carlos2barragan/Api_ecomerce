import "dotenv/config";
import mongoose from 'mongoose';
import Review from '../models/review.model.js'; // Asegúrate de que la ruta sea correcta

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost:27017/apiecomerce");
    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("Error de conexión a la base de datos:", error);
    process.exit(1); // Salir si no se puede conectar
  }
}

async function reviewSeeder() {
  await connectDB(); // Conectar a la base de datos

  const validProductIds = [
    '671bb552399dfa1b0ac3917b', 
    '671bb552399dfa1b0ac3917c', 
    '671bb552399dfa1b0ac3917d'
  ];

  // Comprobación de validez de los IDs de producto
  for (const id of validProductIds) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error(`El ID de producto ${id} no es válido.`);
      return; // Salir si hay un ID no válido
    }
  }

  try {
    const reviews = [
      {
        _id: new mongoose.Types.ObjectId(), // Crear un nuevo ID para la reseña
        nombreRevisor: "Carlos Martínez",
        calificacion: 5,
        comentario: "Excelente calidad y muy bonito.",
        fecha: new Date(),
        productoId: new mongoose.Types.ObjectId(validProductIds[0]) // ID de producto válido
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombreRevisor: "Lucía Fernández",
        calificacion: 4,
        comentario: "Buen regalo para la familia.",
        fecha: new Date(),
        productoId: new mongoose.Types.ObjectId(validProductIds[1]) // ID de producto válido
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombreRevisor: "Juan Pérez",
        calificacion: 3,
        comentario: "Calidad aceptable, pero esperaba más.",
        fecha: new Date(),
        productoId: new mongoose.Types.ObjectId(validProductIds[2]) // ID de producto válido
      }
    ];
    
    await Review.create(reviews);
    console.log("[Seeder] Reseñas creadas");
  } catch (err) {
    console.error("[Seeder] Error creando reseñas:", err.message);
    console.error("[Seeder] Detalles del error:", err);
  } finally {
    mongoose.connection.close(); // Cerrar la conexión después de la operación
  }
}

reviewSeeder();
