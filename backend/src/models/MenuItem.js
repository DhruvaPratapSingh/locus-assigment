// backend/src/models/MenuItem.js
import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
  
  name: String,
  price: Number,
  stock: Number,
  description: String,
  imageUrl: { type: String, default: "" }, // Optional field for image URL
}, {  
  timestamps: true // Automatically manage createdAt and updatedAt fields
});

export default mongoose.model("MenuItem", MenuItemSchema);
