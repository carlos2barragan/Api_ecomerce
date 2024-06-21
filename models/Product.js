import mongoose from "../config/mongoose.config.js";

const ProductSchema = mongoose.Schema({
  name: String,
  price: Number,
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
  image: String,
  deletedAt: Date
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
