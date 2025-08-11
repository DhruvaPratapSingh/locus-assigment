// backend/src/app.js
import express from "express";
import cors from "cors";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/menu", menuRoutes);
app.use("/order", orderRoutes);

export default app;
