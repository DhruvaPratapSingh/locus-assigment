
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
      quantity: Number,
    },
  ],
  status: { type: String,default:"paid" }, // pending, completed, cancelled, autocancelled
  status: { type: String, default: "pending" }, 
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", OrderSchema);
