// backend/src/server.js
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { getMenu, createMenuItem } from "./controllers/menuController.js";
import orderRoutes from "./routes/orderRoutes.js";
import "./jobs/autoCancelOrders.js";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get("/menu", getMenu);
app.post("/menu/create", createMenuItem);
app.use("/order", orderRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
