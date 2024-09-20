import  "dotenv/config";
import fs from "fs";
import path from "path";
import express from "express";
import connectDB from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();
app.use(express.json());
connectDB();


const uploadDir = path.join(import.meta.dirname, "public/avatars");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
//rutas
app.use(userRoutes);
app.use(authRoutes);
app.use(categoryRoutes);

app.listen(3000, () => {
  console.log("El servidor está corriendo en el puerto 3000");
  console.log("http://localhost:3000");
});
