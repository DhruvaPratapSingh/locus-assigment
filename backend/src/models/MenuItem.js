// backend/src/models/MenuItem.js
import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
  
  name: String,
  price: Number,
  stock: Number,
});

export default mongoose.model("MenuItem", MenuItemSchema);
