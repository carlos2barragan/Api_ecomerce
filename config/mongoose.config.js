// Modularización de la conexión
import "dotenv/config";
import mongoose from "mongoose";

// mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
mongoose.connect("mongodb://localhost:27017/apiecomerce")

export default mongoose;
