import 'dotenv/config';

import fs from "fs";
import path from "path";
import cors from "cors";
import express from "express";
import upload from './config/multer.config.js';
import { expressjwt as checkJwt } from 'express-jwt';

import productController from "./controllers/productController.js";
import categoryController from "./controllers/categoryController.js";
import authController from "./controllers/authController.js";
import userController from "./controllers/userController.js";
import orderController from './controllers/orderController.js';


const app = express();

app.use(cors());
app.use(express.json());

const uploadDir = path.join(import.meta.dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Rutas

app.get("/api/users", userController.list);
app.delete("/api/users/:id", userController.destroy);

app.get("/api/products", productController.list);
app.get("/api/products/:id", productController.find);
app.post("/api/products", productController.create);

app.get("/api/categories", categoryController.list);
app.get("/api/categories/:id", categoryController.find);
app.post("/api/categories", categoryController.create);

app.post("/api/auth/login", authController.login);
app.post("/api/auth/register", upload.single("avatar"), userController.create);
app.post("/api/auth/validate", authController.tokenIsValid)

app.post("/api/orders", checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), orderController.create)


app.get("/api/orders", checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), orderController.list)
app.get("/api/rutaprivada", checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), async (req, res) => {
  return res.json("Ruta privada")
})

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
