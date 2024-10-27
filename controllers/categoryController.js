import Category from "../models/Category.js";

async function list(req, res) {
  try {
    const categories = await Category.find().populate("category");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json("Error del servidor");
  }
}
async function find(req, res) {
  try {
    const categories = await Category.find().populate("category");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json("Error del servidor");
  }
}

async function find(req, res) {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json("Error del servidor");
  }
}

async function create(req, res) {
  try {
    const newCategory = await Category.create({
      nombre: req.body.nombre, // Solo se necesita el nombre para crear una categoría
    });
    res.status(201).json("Category created");
  } catch (err) {
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
}


async function update() {}

async function destroy() {}

export default {
  list,
  find,
  create,
  update,
  destroy,
  
};
