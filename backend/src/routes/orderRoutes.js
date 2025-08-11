// backend/src/routes/orderRoutes.js
import express from "express";
import { createOrder, cancelOrder } from "../controllers/orderController.js";

const router = express.Router();

// Create a new order (lock stock)
router.post("/", createOrder);

// Cancel an order (restore stock)
router.post("/:id/cancel", cancelOrder);

export default router;
