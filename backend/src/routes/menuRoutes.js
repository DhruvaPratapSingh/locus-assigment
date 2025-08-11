// backend/src/routes/menuRoutes.js
import express from "express";
import { getMenu, createMenuItem } from "../controllers/menuController.js";

const router = express.Router();

// Get all menu items
router.get("/", getMenu);

// Add a new menu item
router.post("/", createMenuItem);

export default router;
