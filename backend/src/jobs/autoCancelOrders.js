
import cron from "node-cron";
import Order from "../models/order.js";
import MenuItem from "../models/MenuItem.js";

cron.schedule("*/1 * * * *", async () => {
  const now = new Date();
  const cutoff = new Date(now.getTime() - 1 * 60000);

  try {
    const staleOrders = await Order.find({
      status: "pending",
      createdAt: { $lt: cutoff },
    }).populate("items.itemId");

    for (const order of staleOrders) {
      for (const { itemId, quantity } of order.items) {
        if (!itemId) {
          console.warn(
            `⚠ Skipping stock restore: Menu item not found for order ${order._id}`
          );
          continue;
        }
        itemId.stock += quantity;
        await itemId.save();
      }
      order.status = "autocancelled";
      await order.save();
      console.log(`✅ Auto-cancelled order ${order._id}`);
    }
  } catch (err) {
    console.error("❌ Error in autoCancelOrders job:", err);
  }
});
