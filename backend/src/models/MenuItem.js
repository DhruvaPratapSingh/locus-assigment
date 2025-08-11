
import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
  
  name: String,
  price: Number,
  stock: Number,
  description: String,
  imageUrl: { type: String, default: "" },
}, {  
  timestamps: true
});

export default mongoose.model("MenuItem", MenuItemSchema);
