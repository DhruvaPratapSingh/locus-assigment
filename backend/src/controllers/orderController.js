// backend/src/controllers/orderController.js
import Order from "../models/order.js";
import MenuItem from "../models/MenuItem.js";

export const createOrder = async (req, res) => {
  const { items } = req.body;

  for (const { itemId, quantity } of items) {
    const item = await MenuItem.findById(itemId);
    if (!item || item.stock < quantity) {
      return res.status(400).json({ msg: "Insufficient stock" });
    }
    item.stock -= quantity;
    await item.save();
  }

  const order = new Order({ items });
  await order.save();

  res.json(order);
};

export const cancelOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate("items.itemId");

  if (!order) {
    return res.status(400).json({ msg: "Cannot cancel" });
  }

  for (const { itemId, quantity } of order.items) {
    itemId.stock += quantity;
    await itemId.save();
  }

  order.status = "cancelled";
  await order.save();

  res.json(order);
};

// New controller to mark order as paid
export const payOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  // if (!order || order.status !== "pending") {
  //   return res.status(400).json({ msg: "Cannot pay this order" });
  // }

  order.status = "paid";
  await order.save();

  res.json({ msg: "Order paid successfully", order });
};
