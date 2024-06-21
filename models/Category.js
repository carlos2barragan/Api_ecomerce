import mongoose from "../config/mongoose.config.js";

const CategorySchema = mongoose.Schema({
  name: String,
});
const Category = mongoose.model("Category", CategorySchema);

export default Category;
