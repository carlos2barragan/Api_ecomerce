import mongoose from '../config/mongoose.config.js';
import Product from '../models/Product.js';

// Función para conectarse a la base de datos
async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect('mongodb://localhost:27017/tuNombreDeBaseDeDatos', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("[DB] Conexión exitosa");
    } catch (err) {
      console.error("[DB] Error de conexión:", err);
      process.exit(1);
    }
  } else {
    console.log("[DB] Ya hay una conexión activa");
  }
}

// Función para el seeder de productos
async function productSeeder() {
  await connectDB();
  try {
    // Limpiar la colección antes de insertar nuevos productos
    await Product.deleteMany({});

    // Crear nuevos productos
    await Product.create([
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Regalo Navideño Exclusivo",
        precio: 350000,
        categoriaId: "6657fecf41bac694f2713351",
        descripcionOne: "Un hermoso set de regalos navideños para sorprender a tus seres queridos.",
        descripciontwo: "Incluye regalos decorativos y funcionales para todas las edades.",
        images: [
          "https://media.istockphoto.com/id/1353442746/es/foto/regalo-de-navidad-3d-regalo-sobre-fondo-rojo-con-espacio-de-copia.jpg?s=612x612&w=0&k=20&c=2DwgJvKq4ojp0KchNABQVdx2fgHP4-N_PYDnlVfopQ4=",
          "https://media.istockphoto.com/id/1477614491/es/foto/caja-de-regalo-roja-para-navidad-espacio-de-copia-3d-renderizado.jpg?s=612x612&w=0&k=20&c=2Mi3V9YOlO8DrojUvzSmQ2yXojVNZv-cycyDz_RTftQ="
        ],
        material: "Plástico y Tela",
        dimensions: "30x20x15 cm",
        stock: 100,
        shippingTime: "3-5 días laborales",
        marca: "Marca Ejemplo"
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Cesta de Regalos Gourmet",
        precio: 600000,
        categoriaId: "6657fecf41bac694f2713351",
        descripcionOne: "Una cesta exquisita con productos gourmet.",
        descripciontwo: "Incluye una variedad de chocolates, quesos y vinos selectos.",
        images: [
          "https://images.unsplash.com/photo-1557221753-1c1cd7214a53",
          "https://images.unsplash.com/photo-1610780374460-5c488cc3761f",
          "https://images.unsplash.com/photo-1586657989665-89d7c6236b77"
        ],
        material: "Variedad",
        dimensions: "40x30x25 cm",
        stock: 50,
        shippingTime: "3-5 días laborales",
        marca: "Gourmet Delights"
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Juego de Té Elegante",
        precio: 75000,
        categoriaId: "6657fecf41bac694f2713351",
        descripcionOne: "Un juego de té de cerámica que combina elegancia y funcionalidad.",
        images: [
          "https://images.unsplash.com/photo-1594855643243-4eb2b7351c3c",
          "https://images.unsplash.com/photo-1594855732306-9f9f10a40393"
        ],
        material: "Cerámica",
        dimensions: "Juego de 5 piezas",
        stock: 20,
        shippingTime: "2-4 días laborales",
        marca: "Tea Elegance"
      }
    ]);

    console.log("[DB] Seeder ejecutado con éxito.");
  } catch (err) {
    console.error("[DB] Error al ejecutar el seeder:", err);
  } finally {
    mongoose.connection.close();
  }
}

// Ejecutar el seeder
productSeeder();
