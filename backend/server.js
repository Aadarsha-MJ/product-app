import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const startserver = async () => {
  try {
    await connectDB();

    // Middlewares
    app.use(express.json()); //allows to accept json data in the body

    //Routes
    app.use("/api/products", productRoutes);
    app.use("/api/user", userRoutes); // User routes (for registration, login, etc.)

    // Start server
    app.listen(PORT, () => {
      console.log("Server started at http://localhost:" + PORT);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
};

startserver();

