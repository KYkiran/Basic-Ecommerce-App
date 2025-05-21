import express from 'express';
import dotenv from 'dotenv';
import { connectionDB } from './config/db.js';
import cors from 'cors'; // Add this import

import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();
const PORT=process.env.PORT || 5000;

// Add CORS middleware
app.use(cors());

app.use(express.json());

app.use("/api/products",productRoutes);

app.listen(PORT,()=>{ 
    connectionDB();
    console.log("Server started at http://localhost:"+PORT);
    
})