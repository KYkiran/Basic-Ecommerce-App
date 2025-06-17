import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectionDB } from './config/db.js';
import cors from 'cors';

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Connect to database
connectionDB();

// Middleware
app.use(cors());
app.use(express.json());


// API Routes
app.use("/api/products", productRoutes);


// Serve frontend in production
if (process.env.NODE_ENV === "production") {
    
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  // For all non-API routes, send the frontend
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend","dist","index.html"));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});
