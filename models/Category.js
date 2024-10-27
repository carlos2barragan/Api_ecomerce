import mongoose from "../config/mongoose.config.js";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Asegúrate de que el nombre sea requerido
    trim: true, // Elimina espacios en blanco antes y después del nombre
  },
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;