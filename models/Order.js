import mongoose from "../config/mongoose.config.js";

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    products: [
        {
            productDetail: {
                type: mongoose.Types.ObjectId,
                ref: "Product"
            },
            quantity: Number
        }
    ],

    total: Number,
    paymentMethod: String,
    dato1: String,
    dato2: String,
    dato3: String,
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
