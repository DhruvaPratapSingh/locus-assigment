// backend/src/models/Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
      quantity: Number
    }
  ],
  status: { type: String, default: "pending" }, // pending, completed, cancelled
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", OrderSchema);
