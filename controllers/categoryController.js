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
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json("Error del servidor");
  }
}

async function create(req, res) {
  try {
    const newCategory = await Category.create({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      image: req.body.image,
    });
    res.status(201).json("Category created");
  } catch (err) {
    res.status(500).json("Error del servidor");
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
