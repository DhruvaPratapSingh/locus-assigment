// backend/src/jobs/autoCancelOrders.js
import cron from "node-cron";
import Order from "../models/order.js";
import MenuItem from "../models/MenuItem.js";

cron.schedule("*/1 * * * *", async () => {
  const now = new Date();
  const cutoff = new Date(now.getTime() - 15 * 60000);

  const staleOrders = await Order.find({
    status: "pending",
    createdAt: { $lt: cutoff }
  }).populate("items.itemId");

  for (const order of staleOrders) {
    for (const { itemId, quantity } of order.items) {
      itemId.stock += quantity;
      await itemId.save();
    }
    order.status = "cancelled";
    await order.save();
    console.log(`Auto-cancelled order ${order._id}`);
  }
});
