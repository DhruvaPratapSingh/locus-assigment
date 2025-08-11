import express from "express";
import { createOrder, cancelOrder, payOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.post("/:id/cancel", cancelOrder);
router.post("/:id/pay", payOrder);  // Add this route

export default router;
