import Product from "../models/Product.js";

async function list(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
}

async function find(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (product && product.deletedAt === null) {
      res.status(200).json(product);
    } else {
      res.status(404).json("Producto no encontrado");
    }
  } catch (err) {
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
}

async function create(req, res) {
  try {
    if (!Array.isArray(req.body.images)) {
      return res.status(400).json({ message: "images debe ser un array." });
    }

    const newProduct = await Product.create({
      nombre: req.body.nombre,
      precio: req.body.precio,
      images: req.body.images,
      descripcionOne: req.body.descripcionOne,
      descripcionTwo: req.body.descripcionTwo,
      categoriaId: req.body.categoriaId,
      material: req.body.material || null,
      dimensions: req.body.dimensions || null,
      stock: req.body.stock || 0,
      shippingTime: req.body.shippingTime || null,
    });

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
}

async function update(req, res) {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true, runValidators: true });
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json("Producto no encontrado");
    }
  } catch (err) {
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
}

async function destroy(req, res) {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndUpdate(productId, { deletedAt: new Date() }, { new: true });
    if (deletedProduct) {
      res.status(200).json("Producto eliminado");
    } else {
      res.status(404).json("Producto no encontrado");
    }
  } catch (err) {
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
}

async function findByCategory(req, res) {
  try {
    const { categoriaId } = req.params;
    const products = await Product.find({ categoriaId });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
}

export default {
  list,
  find,
  create,
  update,
  destroy,
  findByCategory,
};
